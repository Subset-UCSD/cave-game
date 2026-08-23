import { parseGlb } from "../../common/gltf/bingltfparser";
import { ModelId } from "../../common/messages";
import { Gl } from "../render/Gl";
import { GltfModel } from "../render/GltfModel";

/**
 * this is jim. he manages the models
 *
 * in the future jim may have the important job of freeing up unused models. but that day is not today
 *
 * NOTE: model IDs = path to model .glb file
 */
export class ModelManager {
	#modelLoaded: Record<ModelId, GltfModel | "loading"> = {};

	/**
	 * begins loading the model if it isn't already loaded or being loaded
	 *
	 * feel free to call wastefully
	 */
	requestLoadModel(gl: Gl, modelPath: ModelId) {
		if (!this.#modelLoaded[modelPath]) {
			this.#modelLoaded[modelPath] = "loading";
			fetch(modelPath)
				.then((r) => r.arrayBuffer())
				.then(parseGlb)
				.then((parsed) => {
					this.#modelLoaded[modelPath] = new GltfModel(gl, parsed);
				});
		}
	}

	/**
	 * returns the model if loaded. if not, then returns `null`
	 *
	 * used by the renderer; if the model isn't loaded yet it'll just not draw it
	 */
	needModelNOW(modelId: ModelId): GltfModel | null {
		return this.#modelLoaded[modelId] === "loading" ? null : (this.#modelLoaded[modelId] ?? null);
	}
}
