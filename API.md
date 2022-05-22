# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ImagePipeline <a name="ImagePipeline" id="cdk-image-pipeline.ImagePipeline"></a>

#### Initializers <a name="Initializers" id="cdk-image-pipeline.ImagePipeline.Initializer"></a>

```typescript
import { ImagePipeline } from 'cdk-image-pipeline'

new ImagePipeline(scope: Construct, id: string, props: ImagePipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-image-pipeline.ImagePipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-image-pipeline.ImagePipeline.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-image-pipeline.ImagePipelineProps">ImagePipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-image-pipeline.ImagePipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-image-pipeline.ImagePipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-image-pipeline.ImagePipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-image-pipeline.ImagePipelineProps">ImagePipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-image-pipeline.ImagePipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-image-pipeline.ImagePipeline.isConstruct"></a>

```typescript
import { ImagePipeline } from 'cdk-image-pipeline'

ImagePipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-image-pipeline.ImagePipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-image-pipeline.ImagePipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### ImagePipelineProps <a name="ImagePipelineProps" id="cdk-image-pipeline.ImagePipelineProps"></a>

#### Initializer <a name="Initializer" id="cdk-image-pipeline.ImagePipelineProps.Initializer"></a>

```typescript
import { ImagePipelineProps } from 'cdk-image-pipeline'

const imagePipelineProps: ImagePipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.componentDocPath">componentDocPath</a></code> | <code>string</code> | Relative path to the Image Builder component document. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.componentName">componentName</a></code> | <code>string</code> | Name of the Component. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.imageRecipe">imageRecipe</a></code> | <code>string</code> | Name of the Image Recipe. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.infraConfigName">infraConfigName</a></code> | <code>string</code> | Name of the Infrastructure Configuration for Image Builder. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.kmsKeyAlias">kmsKeyAlias</a></code> | <code>string</code> | KMS Key used to encrypt the SNS topic. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.parentImage">parentImage</a></code> | <code>string</code> | The source (parent) image that the image recipe uses as its base environment. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.pipelineName">pipelineName</a></code> | <code>string</code> | Name of the Image Pipeline. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.profileName">profileName</a></code> | <code>string</code> | Name of the instance profile that will be associated with the Instance Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.email">email</a></code> | <code>string</code> | Email used to receive Image Builder Pipeline Notifications via SNS. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.imageRecipeVersion">imageRecipeVersion</a></code> | <code>string</code> | Image recipe version (Default: 0.0.1). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.instanceTypes">instanceTypes</a></code> | <code>string[]</code> | List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.platform">platform</a></code> | <code>string</code> | Platform type Linux or Windows (Default: Linux). |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.securityGroups">securityGroups</a></code> | <code>string[]</code> | List of security group IDs for the Infrastructure Configuration. |
| <code><a href="#cdk-image-pipeline.ImagePipelineProps.property.subnetId">subnetId</a></code> | <code>string</code> | Subnet ID for the Infrastructure Configuration. |

---

##### `componentDocPath`<sup>Required</sup> <a name="componentDocPath" id="cdk-image-pipeline.ImagePipelineProps.property.componentDocPath"></a>

```typescript
public readonly componentDocPath: string;
```

- *Type:* string

Relative path to the Image Builder component document.

---

##### `componentName`<sup>Required</sup> <a name="componentName" id="cdk-image-pipeline.ImagePipelineProps.property.componentName"></a>

```typescript
public readonly componentName: string;
```

- *Type:* string

Name of the Component.

---

##### `imageRecipe`<sup>Required</sup> <a name="imageRecipe" id="cdk-image-pipeline.ImagePipelineProps.property.imageRecipe"></a>

```typescript
public readonly imageRecipe: string;
```

- *Type:* string

Name of the Image Recipe.

---

##### `infraConfigName`<sup>Required</sup> <a name="infraConfigName" id="cdk-image-pipeline.ImagePipelineProps.property.infraConfigName"></a>

```typescript
public readonly infraConfigName: string;
```

- *Type:* string

Name of the Infrastructure Configuration for Image Builder.

---

##### `kmsKeyAlias`<sup>Required</sup> <a name="kmsKeyAlias" id="cdk-image-pipeline.ImagePipelineProps.property.kmsKeyAlias"></a>

```typescript
public readonly kmsKeyAlias: string;
```

- *Type:* string

KMS Key used to encrypt the SNS topic.

Enter an existing KMS Key Alias in your target account/region.

---

##### `parentImage`<sup>Required</sup> <a name="parentImage" id="cdk-image-pipeline.ImagePipelineProps.property.parentImage"></a>

```typescript
public readonly parentImage: string;
```

- *Type:* string

The source (parent) image that the image recipe uses as its base environment.

The value can be the parent image ARN or an Image Builder AMI ID

---

##### `pipelineName`<sup>Required</sup> <a name="pipelineName" id="cdk-image-pipeline.ImagePipelineProps.property.pipelineName"></a>

```typescript
public readonly pipelineName: string;
```

- *Type:* string

Name of the Image Pipeline.

---

##### `profileName`<sup>Required</sup> <a name="profileName" id="cdk-image-pipeline.ImagePipelineProps.property.profileName"></a>

```typescript
public readonly profileName: string;
```

- *Type:* string

Name of the instance profile that will be associated with the Instance Configuration.

---

##### `email`<sup>Optional</sup> <a name="email" id="cdk-image-pipeline.ImagePipelineProps.property.email"></a>

```typescript
public readonly email: string;
```

- *Type:* string

Email used to receive Image Builder Pipeline Notifications via SNS.

---

##### `imageRecipeVersion`<sup>Optional</sup> <a name="imageRecipeVersion" id="cdk-image-pipeline.ImagePipelineProps.property.imageRecipeVersion"></a>

```typescript
public readonly imageRecipeVersion: string;
```

- *Type:* string

Image recipe version (Default: 0.0.1).

---

##### `instanceTypes`<sup>Optional</sup> <a name="instanceTypes" id="cdk-image-pipeline.ImagePipelineProps.property.instanceTypes"></a>

```typescript
public readonly instanceTypes: string[];
```

- *Type:* string[]

List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ]).

---

##### `platform`<sup>Optional</sup> <a name="platform" id="cdk-image-pipeline.ImagePipelineProps.property.platform"></a>

```typescript
public readonly platform: string;
```

- *Type:* string

Platform type Linux or Windows (Default: Linux).

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="cdk-image-pipeline.ImagePipelineProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: string[];
```

- *Type:* string[]

List of security group IDs for the Infrastructure Configuration.

---

##### `subnetId`<sup>Optional</sup> <a name="subnetId" id="cdk-image-pipeline.ImagePipelineProps.property.subnetId"></a>

```typescript
public readonly subnetId: string;
```

- *Type:* string

Subnet ID for the Infrastructure Configuration.

---



