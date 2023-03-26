import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import {
  PetClientOptionalParams,
  GetDogOptionalParams,
  GetDogResponse,
  Cat,
  PutCatOptionalParams,
  PutCatResponse,
  Kitten,
  PostKittenOptionalParams,
  PostKittenResponse
} from "./models";

export class PetClient extends coreClient.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the PetClient class.
   * @param options The parameter options
   */
  constructor(options?: PetClientOptionalParams) {
    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: PetClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8"
    };

    const packageDetails = `azsdk-js-petClient/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      endpoint: options.endpoint ?? options.baseUri ?? "http://localhost:3000"
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] = options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge
          }
        })
      );
    }

    // Assigning values to Constant parameters
    this.$host = options.$host || "http://localhost:3000";
  }

  /**
   * Get a dog
   * @param options The options parameters.
   */
  getDog(options?: GetDogOptionalParams): Promise<GetDogResponse> {
    return this.sendOperationRequest({ options }, getDogOperationSpec);
  }

  /**
   * Put a cat onto our servers
   * @param cat Cat
   * @param options The options parameters.
   */
  putCat(cat: Cat, options?: PutCatOptionalParams): Promise<PutCatResponse> {
    return this.sendOperationRequest({ cat, options }, putCatOperationSpec);
  }

  /**
   * Post a kitten onto our servers
   * @param kitten Kitten
   * @param options The options parameters.
   */
  postKitten(
    kitten: Kitten,
    options?: PostKittenOptionalParams
  ): Promise<PostKittenResponse> {
    return this.sendOperationRequest(
      { kitten, options },
      postKittenOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getDogOperationSpec: coreClient.OperationSpec = {
  path: "/pets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Dog
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putCatOperationSpec: coreClient.OperationSpec = {
  path: "/pets",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  requestBody: Parameters.cat,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const postKittenOperationSpec: coreClient.OperationSpec = {
  path: "/pets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  requestBody: Parameters.kitten,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
