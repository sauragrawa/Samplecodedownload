import * as coreClient from "@azure/core-client";

export const Dog: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Dog",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      wagsTailWhenHappy: {
        serializedName: "wagsTailWhenHappy",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const ErrorModel: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorModel",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "Number"
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Cat: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Cat",
    modelProperties: {
      likesMilk: {
        serializedName: "likesMilk",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const Kitten: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Kitten",
    modelProperties: {
      ...Cat.type.modelProperties,
      eatsMiceYet: {
        serializedName: "eatsMiceYet",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};
