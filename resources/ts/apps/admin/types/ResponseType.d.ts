import type {ColorVariants} from "@wovosoft/wovoui/src/types";

export type ResponseType = {
    data: {
        message: string;
        title?: string;
        variant?: ColorVariants;
    }
}
