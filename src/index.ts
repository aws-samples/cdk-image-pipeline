import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import * as path from 'path';
import {
  aws_iam as iam,
  aws_imagebuilder as imagebuilder,
  aws_kms as kms,
  aws_sns as sns,
  aws_sns_subscriptions as subscriptions,
  aws_lambda as lambda,
  Names,
} from 'aws-cdk-lib';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';

export interface ComponentProps {
  /**
   * Relative path to Image Builder component document
   */
  readonly document: string;
  /**
   * Name of the Component Document
   */
  readonly name: string;
  /**
   * Version for each component document
   */
  readonly version: string;
}
export interface VolumeProps {
  /**
   * Name of the volume
   */
  readonly deviceName: string;
  /**
   * EBS Block Store Parameters
   */
  readonly ebs: imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty;
}

export interface ImagePipelineProps {
  /**
   * List of component props
   */
  readonly components: (ComponentProps | string)[];
  /**
   * Additional policies to add to the instance profile associated with the Instance Configurations
   */
  readonly additionalPolicies?: iam.ManagedPolicy[];
  /**
   * UserData script that will override default one (if specified)
   *
   * @default - none
   */
  readonly userDataScript?: string;
  /**
   * Image recipe version (Default: 0.0.1)
   */
  readonly imageRecipeVersion?: string;
  /**
   * The source (parent) image that the image recipe uses as its base environment. The value can be the parent image ARN or an Image Builder AMI ID
   */
  readonly parentImage: string;
  /**
   * KMS Key used to encrypt the SNS topic.
   */
  readonly kmsKey?: kms.IKey;
  /**
   * List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ])
   */
  readonly instanceTypes?: string[];
  /**
   * Platform type Linux or Windows (Default: Linux)
   */
  readonly platform?: string;
  /**
   * Email used to receive Image Builder Pipeline Notifications via SNS
   */
  readonly email?: string;
  /**
   * List of security group IDs for the Infrastructure Configuration
   */
  readonly securityGroups?: string[];
  /**
   * Subnet ID for the Infrastructure Configuration
   */
  readonly subnetId?: string;
  /**
   * Configuration for the AMI's EBS volumes
   */
  readonly ebsVolumeConfigurations?: VolumeProps[];
  /**
   * Set to true if you want to enable continuous vulnerability scans through AWS Inpector
   */
  readonly enableVulnScans?: boolean;
  /**
   * Store vulnerability scans through AWS Inpsector in ECR using this repo name (if option is enabled)
   */
  readonly vulnScansRepoName?: string;
  /**
   * Store vulnerability scans through AWS Inpsector in ECR using these image tags (if option is enabled)
   */
  readonly vulnScansRepoTags?: string[];
  /**
   * Set to true if you want to copy this AMI to other accounts using a Distribution Configuration
   */
  readonly enableCrossAccountDistribution?: boolean;
  /**
   * List of accounts to copy this AMI to, if the option to do so is enabled
   */
  readonly distributionAccountIDs?: string[];
  /**
   * List of regions to copy this AMI to, if the option to do so is enabled
   */
  readonly distributionRegions?: string[];
  /**
   * Parameter Store path to store latest AMI ID under
   */
  readonly amiIdSsmPath?: string;
  /**
   * Account ID for Parameter Store path above
   */
  readonly amiIdSsmAccountId?: string;
  /**
   * Region for Parameter Store path above
   */
  readonly amiIdSsmRegion?: string;
}

export class ImagePipeline extends Construct {
  imageRecipeComponents: imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[];
  /**
   * The internal image pipeline created by this construct.
   */
  readonly pipeline: imagebuilder.CfnImagePipeline;
  /**
   * SNS Topic where the internal ImageBuilder will notify about new builds.
   */
  readonly builderSnsTopic: sns.Topic;

  constructor(scope: Construct, id: string, props: ImagePipelineProps) {
    super(scope, id);
    let infrastructureConfig: imagebuilder.CfnInfrastructureConfiguration;
    let imageRecipe: imagebuilder.CfnImageRecipe;
    this.imageRecipeComponents = [];

    const uid = Names.uniqueId(this);
    const profileName = `${uid}Profile`;

    // Construct code below
    this.builderSnsTopic = new sns.Topic(this, 'ImageBuilderTopic', {
      displayName: 'Image Builder Notify',
      masterKey: props.kmsKey,
    });

    if (props.email != null) {
      this.builderSnsTopic.addSubscription(new subscriptions.EmailSubscription(props.email));
    }

    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      description: 'IAM role used as part of an Image Builder pipeline',
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilder'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilderECRContainerBuilds'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
    if (typeof props.additionalPolicies !== 'undefined' && props.additionalPolicies.length >= 1) {
      for (const policy of props.additionalPolicies) {
        role.addManagedPolicy(policy);
      }
    }

    const profile = new iam.CfnInstanceProfile(this, 'InstanceProfile', {
      roles: [role.roleName],
      instanceProfileName: profileName,
    });

    if (props.securityGroups == null || props.subnetId == null) {
      infrastructureConfig = new imagebuilder.CfnInfrastructureConfiguration(this, 'InfrastructureConfiguration', {
        instanceProfileName: profileName,
        name: `${uid}InfraConfig`,
        description: 'Example Infrastructure Configuration for Image Builder',
        instanceTypes: props.instanceTypes ?? ['t3.medium', 'm5.large', 'm5.xlarge'],
        snsTopicArn: this.builderSnsTopic.topicArn,
      });
    } else {
      infrastructureConfig = new imagebuilder.CfnInfrastructureConfiguration(this, 'InfrastructureConfiguration', {
        instanceProfileName: profileName,
        name: `${uid}InfraConfig`,
        description: 'Example Infrastructure Configuration for Image Builder',
        instanceTypes: props.instanceTypes ?? ['t3.medium', 'm5.large', 'm5.xlarge'],
        snsTopicArn: this.builderSnsTopic.topicArn,
        securityGroupIds: props.securityGroups,
        subnetId: props.subnetId,
      });
    }

    infrastructureConfig.addDependency(profile);

    /**
     * Image recipe configuration
     */
    let imageRecipeProps: imagebuilder.CfnImageRecipeProps;
    imageRecipeProps = {
      components: [],
      name: 'Placeholder',
      parentImage: props.parentImage,
      version: props.imageRecipeVersion ?? '0.0.1',
    };
    if (props.userDataScript) {
      imageRecipeProps = {
        ...imageRecipeProps,
        additionalInstanceConfiguration: {
          userDataOverride: props.userDataScript,
        },
      };
    };
    if (props.ebsVolumeConfigurations) {
      imageRecipeProps = {
        ...imageRecipeProps,
        blockDeviceMappings: props.ebsVolumeConfigurations,
      };
    }
    imageRecipe = new imagebuilder.CfnImageRecipe(this, 'ImageRecipe', imageRecipeProps);

    props.components.forEach((component) => {
      if (typeof component === 'string') {
        this.imageRecipeComponents.push({ componentArn: component });
      } else {
        let newComponent = new imagebuilder.CfnComponent(this, component.name, {
          name: `${uid}${component.name}`,
          platform: props.platform ? props.platform : 'Linux',
          version: component.version,
          data: readFileSync(component.document).toString(),
        });

        // add the component to the Image Recipe
        this.imageRecipeComponents.push({ componentArn: newComponent.attrArn });
      }

      imageRecipe.components = this.imageRecipeComponents;
    });

    const hashId = this.hash(props.components);
    imageRecipe.name = `${uid}${hashId}`;

    let imagePipelineProps: imagebuilder.CfnImagePipelineProps;
    imagePipelineProps = {
      infrastructureConfigurationArn: infrastructureConfig.attrArn,
      name: `${uid}ImagePipeline`,
      description: 'A sample image pipeline',
      imageRecipeArn: imageRecipe.attrArn,
    };
    if (props.enableVulnScans) {
      imagePipelineProps = {
        ...imagePipelineProps,
        imageScanningConfiguration: {
          imageScanningEnabled: props.enableVulnScans,
          ecrConfiguration: {
            repositoryName: props.vulnScansRepoName,
            containerTags: props.vulnScansRepoTags,
          },
        },
      };
    }
    if (props.enableCrossAccountDistribution) {
      const distributionsList: imagebuilder.CfnDistributionConfiguration.DistributionProperty[] = [];
      props.distributionRegions?.forEach(distributionRegion => {
        const distributionConfig: any = {
          region: distributionRegion,
          amiDistributionConfiguration: {
            //Capital case here because it's an object of type any, but capital case is what is expected in CloudFormation
            //https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-imagebuilder-distributionconfiguration-amidistributionconfiguration.html
            Name: `${uid}-${distributionRegion}-{{imagebuilder:buildDate}}`,
            Description: `copy AMI to ${distributionRegion}`,
            TargetAccountIds: props.distributionAccountIDs,
            LaunchPermissionConfiguration: {
              UserIds: props.distributionAccountIDs,
            },
            KmsKeyId: props.ebsVolumeConfigurations ? props.ebsVolumeConfigurations[0].ebs.kmsKeyId : 'aws/ebs', //use default AWS-managed key if one isn't given
          },
        };
        distributionsList.push(distributionConfig);
      });
      const amiDistributionConfiguration = new imagebuilder.CfnDistributionConfiguration(this, 'amiDistributionConfiguration', {
        name: `${uid}DistributionConfig`,
        description: `Cross account distribution settings for ${uid}`,
        distributions: distributionsList,
      });
      imagePipelineProps = {
        ...imagePipelineProps,
        distributionConfigurationArn: amiDistributionConfiguration.attrArn,
      };
    }

    /**
     * Create Lambda to add latest built image's ID to Parameter Store
     * (only if a Parameter Store path is provided)
     */
    if (props.amiIdSsmPath) {
      const amiIdSsmPath = props.amiIdSsmPath.replace(/^\/+/, '/');
      const amiSsmUpdateLambdaPolicy = new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            resources: [`arn:aws:ssm:${props.amiIdSsmRegion}:${props.amiIdSsmAccountId}:parameter${amiIdSsmPath}`],
            actions: [
              'ssm:PutParameter',
              'ssm:GetParameterHistory',
              'ssm:GetParameter',
              'ssm:GetParameters',
              'ssm:AddTagsToResource',
            ],
          }),
        ],
      });
      const amiSsmUpdateLambdaRole = new iam.Role(this, 'UpdateLambdaRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ],
        inlinePolicies: {
          AmiSsmUpdateLambdaPolicy: amiSsmUpdateLambdaPolicy,
        },
      });
      const amiSsmUpdateLambda = new lambda.Function(this, 'UpdateLambda', {
        runtime: lambda.Runtime.PYTHON_3_10,
        code: lambda.Code.fromAsset(path.join(__dirname, '../assets/image-builder-update-lambda')),
        handler: 'image-builder-lambda-update-ssm.lambda_handler',
        role: amiSsmUpdateLambdaRole,
        environment: {
          SSM_PATH: amiIdSsmPath,
        },
        memorySize: 256,
      });
      amiSsmUpdateLambda.addEventSource(new SnsEventSource(this.builderSnsTopic, {}));
    }
    this.pipeline = new imagebuilder.CfnImagePipeline(this, 'ImagePipeline', imagePipelineProps);
  }

  /**
   * Helper function to hash an object to create unique resource names
   *
   * @param o an object to hash
   * @returns 6 character hash string
   */
  private hash(o: object): string {
    // Remove any token references that would cause the result to be
    // non-deterministic.
    const cleanString = JSON.stringify(o).replace(/\${[^{]*}/g, '');

    return createHash('sha256')
      .update(cleanString)
      .digest('hex')
      .toUpperCase()
      .slice(0, 6);
  }
}
