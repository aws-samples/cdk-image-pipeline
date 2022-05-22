import { readFileSync } from 'fs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as imagebuilder from 'aws-cdk-lib/aws-imagebuilder';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export interface ImagePipelineProps {
  /**
   * Relative path to the Image Builder component document
   */
  readonly componentDocPath: string;
  /**
   * Name of the Component
   */
  readonly componentName: string;
  /**
   * Name of the instance profile that will be associated with the Instance Configuration.
   */
  readonly profileName: string;
  /**
   * Name of the Infrastructure Configuration for Image Builder
   */
  readonly infraConfigName: string;
  /**
   * Name of the Image Recipe
   */
  readonly imageRecipe: string;
  /**
   * Image recipe version (Default: 0.0.1)
   */
  readonly imageRecipeVersion?: string;
  /**
   * Name of the Image Pipeline
   */
  readonly pipelineName: string;
  /**
   * The source (parent) image that the image recipe uses as its base environment. The value can be the parent image ARN or an Image Builder AMI ID
   */
  readonly parentImage: string;
  /**
   * KMS Key used to encrypt the SNS topic. Enter an existing KMS Key Alias in your target account/region.
   */
  readonly kmsKeyAlias: string;
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
}


export class ImagePipeline extends Construct {
  constructor(scope: Construct, id: string, props: ImagePipelineProps) {
    super(scope, id);
    let infrastructureConfig = null;
    // Constuct code below
    const kmsKey = kms.Key.fromLookup(this, 'KmsKeyLookup', {
      aliasName: props.kmsKeyAlias,
    });
    const topic = new sns.Topic(this, 'ImageBuilderTopic', {
      displayName: 'Image Builder Notify',
      masterKey: kmsKey,
    });

    if (props.email != null) {
      topic.addSubscription(new subscriptions.EmailSubscription(props.email));
    }

    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      description: 'IAM role used as part of an Image Builder pipeline',
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilder'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilderECRContainerBuilds'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));

    const profile = new iam.CfnInstanceProfile(this, 'InstanceProfile', {
      roles: [role.roleName],
      instanceProfileName: props.profileName,
    });

    if (props.securityGroups == null || props.subnetId == null) {
      infrastructureConfig = new imagebuilder.CfnInfrastructureConfiguration(this, 'InfrastructureConfiguration', {
        instanceProfileName: props.profileName,
        name: props.infraConfigName,
        description: 'Example Infrastructure Configuration for Image Builder',
        instanceTypes: props.instanceTypes ?? ['t3.medium', 'm5.large', 'm5.xlarge'],
        snsTopicArn: topic.topicArn,
      });
    } else {
      infrastructureConfig = new imagebuilder.CfnInfrastructureConfiguration(this, 'InfrastructureConfiguration', {
        instanceProfileName: props.profileName,
        name: props.infraConfigName,
        description: 'Example Infrastructure Configuration for Image Builder',
        instanceTypes: props.instanceTypes ?? ['t3.medium', 'm5.large', 'm5.xlarge'],
        snsTopicArn: topic.topicArn,
        securityGroupIds: props.securityGroups,
        subnetId: props.subnetId,
      });
    }

    infrastructureConfig.addDependsOn(profile);

    const component = new imagebuilder.CfnComponent(this, 'Component', {
      name: props.componentName,
      platform: props.platform ?? 'Linux',
      version: '1.0.0',
      data: readFileSync(props.componentDocPath).toString(),
    });

    const imageRecipe = new imagebuilder.CfnImageRecipe(this, 'ImageRecipe', {
      components: [{
        componentArn: component.attrArn,
      }],
      name: props.imageRecipe,
      parentImage: props.parentImage,
      version: props.imageRecipeVersion ?? '0.0.1',
    });

    new imagebuilder.CfnImagePipeline(this, 'ImagePipeline', {
      infrastructureConfigurationArn: infrastructureConfig.attrArn,
      name: props.pipelineName,
      description: 'A sample image pipeline',
      imageRecipeArn: imageRecipe.attrArn,
    });

  }
}