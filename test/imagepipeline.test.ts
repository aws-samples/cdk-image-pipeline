import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { ImagePipeline, ImagePipelineProps } from '../src';

let template: Template;

const props: ImagePipelineProps = {
  componentDocuments: ['test/test_component_example.yml', 'test/test_component_example_2.yml'],
  componentNames: ['TestComponent', 'TestComponent2'],
  componentVersions: ['1.0.0'],
  profileName: 'TestProfile',
  infraConfigName: 'TestInfrastructureConfig',
  imageRecipe: 'TestImageRecipe',
  pipelineName: 'TestImagePipeline',
  parentImage: 'ami-04505e74c0741db8d', // Ubuntu Server 20.04 LTS
  kmsKeyAlias: 'alias/app1/key',
  email: 'unit@test.com',
  enableVulnScans: true,
  vulnScansRepoName: 'image-builder-vuln-scans',
  vulnScansRepoTags: ['al2-x86-base'],
};

const propsWithNetworking: ImagePipelineProps = {
  componentDocuments: ['test/test_component_example.yml'],
  componentNames: ['TestComponent'],
  componentVersions: ['1.0.0'],
  profileName: 'TestProfile',
  infraConfigName: 'TestInfrastructureConfig',
  imageRecipe: 'TestImageRecipe',
  pipelineName: 'TestImagePipeline',
  parentImage: 'ami-04505e74c0741db8d', // Ubuntu Server 20.04 LTS
  kmsKeyAlias: 'alias/app1/key',
  securityGroups: ['sg-12345678'],
  subnetId: 'subnet-12345678',
};

const propsWithVolumeConfig: ImagePipelineProps = {
  componentDocuments: ['test/test_component_example.yml'],
  componentNames: ['TestComponent'],
  componentVersions: ['1.0.0'],
  profileName: 'TestProfile',
  infraConfigName: 'TestInfrastructureConfig',
  imageRecipe: 'TestImageRecipe',
  pipelineName: 'TestImagePipeline',
  parentImage: 'ami-04505e74c0741db8d', // Ubuntu Server 20.04 LTS
  kmsKeyAlias: 'alias/app1/key',
  securityGroups: ['sg-12345678'],
  subnetId: 'subnet-12345678',
  ebsVolumeName: '/dev/xvda',
  ebsVolumeConfiguration: {
    encrypted: true,
    iops: 200,
    kmsKeyId: 'alias/app1/key',
    volumeSize: 20,
    volumeType: 'gp3',
    throughput: 1000,
  },
};

beforeAll(() => {
  process.env.CDK_DEFAULT_ACCOUNT = '123456789012';
  process.env.CDK_DEFAULT_REGION = 'us-east-1';
  const app = new cdk.App();
  const testStack = new cdk.Stack(app, 'testStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
  new ImagePipeline(testStack, 'ImagePipelineStack', props);
  template = Template.fromStack(testStack);
});

test('Infrastructure Configuration SNS topic is created', () => {
  template.resourceCountIs('AWS::SNS::Topic', 1);
});

test('Given an email address, an SNS Subscription should be created', () => {
  template.resourceCountIs('AWS::SNS::Subscription', 1);
  template.hasResourceProperties('AWS::SNS::Subscription', {
    Protocol: 'email',
    Endpoint: 'unit@test.com',
  });
});

test('Infrastructure Configuration is created', () => {
  template.resourceCountIs('AWS::ImageBuilder::InfrastructureConfiguration', 1);
});

test('Infrastructure Configuration IAM Role and Instance Profile are created', () => {
  template.resourceCountIs('AWS::IAM::Role', 1);
  template.resourceCountIs('AWS::IAM::InstanceProfile', 1);
});

test('IAM Role contains necessary permission set', () => {
  template.hasResourceProperties('AWS::IAM::Role',
    Match.anyValue());
});

test('Infrastructure Configuration has the default instance types', () => {
  template.hasResourceProperties('AWS::ImageBuilder::InfrastructureConfiguration', {
    InstanceTypes: ['t3.medium', 'm5.large', 'm5.xlarge'],
  });
});

test('Infrastructure Configuration is built with provided Networking properties', () => {
  const app = new cdk.App();
  const testStack = new cdk.Stack(app, 'testStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
  new ImagePipeline(testStack, 'ImagePipelineStack', propsWithNetworking);
  const templateWithNetworking = Template.fromStack(testStack);

  templateWithNetworking.hasResourceProperties('AWS::ImageBuilder::InfrastructureConfiguration', {
    InstanceProfileName: props.profileName,
    Name: props.infraConfigName,
    SnsTopicArn: Match.anyValue(),
    SecurityGroupIds: ['sg-12345678'],
    SubnetId: 'subnet-12345678',
  });
});

test('Infrastructure Configuration is built with provided EBS volume properties', () => {
  const app = new cdk.App();
  const testStack = new cdk.Stack(app, 'testStack', {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
  new ImagePipeline(testStack, 'ImagePipelineStack', propsWithVolumeConfig);
  const templateWithVolume = Template.fromStack(testStack);

  templateWithVolume.hasResourceProperties('AWS::ImageBuilder::ImageRecipe', {
    Name: 'TestImageRecipe',
    BlockDeviceMappings: [
      {
        DeviceName: '/dev/xvda',
        Ebs: {
          Encrypted: true,
          Iops: 200,
          KmsKeyId: 'alias/app1/key',
          VolumeSize: 20,
          VolumeType: 'gp3',
          Throughput: 1000,
        },
      },
    ],
  });
  templateWithVolume.hasResourceProperties('AWS::ImageBuilder::InfrastructureConfiguration', {
    InstanceProfileName: props.profileName,
    Name: props.infraConfigName,
    SnsTopicArn: Match.anyValue(),
    SecurityGroupIds: ['sg-12345678'],
    SubnetId: 'subnet-12345678',
  });
});


test('Infrastructure Configuration contains required properties', () => {
  template.hasResourceProperties('AWS::ImageBuilder::InfrastructureConfiguration', {
    InstanceProfileName: props.profileName,
    Name: props.infraConfigName,
    SnsTopicArn: Match.anyValue(),
  });
});

test.skip('Infrastructure Configuration DependsOn Instance Profile', () => {
  // TODO
});

test('Image Builder Component is created', () => {
  template.resourceCountIs('AWS::ImageBuilder::Component', props.componentDocuments.length);
});

test('Image Recipe is created', () => {
  template.resourceCountIs('AWS::ImageBuilder::ImageRecipe', 1);
});

test('Image Pipeline has Inspector vulnerability scans configured', () => {
  template.resourceCountIs('AWS::ImageBuilder::ImagePipeline', 1);
  template.hasResourceProperties('AWS::ImageBuilder::ImagePipeline', {
    ImageScanningConfiguration: {
      ImageScanningEnabled: true,
      EcrConfiguration: {
        RepositoryName: 'image-builder-vuln-scans',
        ContainerTags: [
          'al2-x86-base',
        ],
      },
    },
  });
});