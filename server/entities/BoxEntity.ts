import * as phys from "cannon-es";

import { EntityModel } from "../../common/messages";
import { Quaternion, Vector3 } from "../../common/types";
import { Game } from "../Game";
import { Entity } from "./Entity";

export class BoxEntity extends Entity {
	constructor(game: Game, model: EntityModel, pos: Vector3, rotation: Quaternion, size: phys.Vec3) {
		super(game, model);
		this.model = model;

		this.body = new phys.Body({
			position: new phys.Vec3(...pos),
			quaternion: new phys.Quaternion(...rotation).normalize(),
			shape: new phys.Box(size),
			mass: 0.5,
		});
	}
}
