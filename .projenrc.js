const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Cameron Magee',
  authorAddress: 'magcamer@amazon.com',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  cdkVersion: '2.59.0',
  constructsVersion: '10.1.215',
  defaultReleaseBranch: 'main',
  name: 'cdk-image-pipeline',
  repositoryUrl: 'https://github.com/aws-samples/cdk-image-pipeline.git',
  description: 'Quickly deploy a complete EC2 Image Builder Image Pipeline using CDK',
  packageName: 'cdk-image-pipeline',
  publishToPypi: {
    distName: 'cdk-image-pipeline',
    module: 'cdk_image_pipeline',
  },
  license: 'MIT-0',
  pullRequestTemplateContents: ['# Fixes', ' ', ' ', 'By submitting this pull request, I confirm that you can use, modify, copy, and redistribute this contribution, under the terms of your choice.'],
  releaseToNpm: true,
  devDeps: ['@types/prettier@2.7.2'],
});

project.addPeerDeps('aws-cdk-lib');
project.addDevDeps('aws-cdk-lib');
project.addDevDeps('projen@0.71.62');

project.synth();