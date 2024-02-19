const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Cameron Magee',
  authorAddress: 'magcamer@amazon.com',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  cdkVersion: '2.128.0',
  constructsVersion: '10.3.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-image-pipeline',
  repositoryUrl: 'https://github.com/aws-samples/cdk-image-pipeline.git',
  description: 'Quickly deploy a complete EC2 Image Builder Image Pipeline using CDK',
  packageName: 'cdk-image-pipeline',
  publishToPypi: {
    distName: 'cdk-image-pipeline',
    module: 'cdk_image_pipeline',
  },
  license: 'Apache-2.0',
  pullRequestTemplateContents: ['# Fixes', ' ', ' ', 'By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of your choice.'],
  releaseToNpm: true,
  devDeps: ['@types/prettier@2.7.2'],
});

project.addPeerDeps('aws-cdk-lib@2.128.0');
project.addDevDeps('aws-cdk-lib@2.128.0');
project.addDevDeps('projen@0.79.27');

project.synth();