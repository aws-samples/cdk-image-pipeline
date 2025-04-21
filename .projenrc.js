const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Cameron Magee',
  authorAddress: 'magcamer@amazon.com',
  copyrightOwner: 'Amazon.com, Inc. or its affiliates. All Rights Reserved.',
  cdkVersion: '2.189.1',
  constructsVersion: '10.4.2',
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
  devDeps: ['@types/prettier@^3.0.0'],
});

project.addPeerDeps('aws-cdk-lib@^2.189.1');
project.addDevDeps('aws-cdk-lib@^2.189.1');
project.addDevDeps('projen@^0.91.18');

project.synth();