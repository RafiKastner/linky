import { linkCode } from "../models/link";

export function createLinkCode(maxCharacters: number): linkCode {
	const characterList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoqrstuvwxyz1234567890"
	let id: linkCode = ""
	for (let i=0; i<maxCharacters; i++) {
		id += characterList[Math.floor(Math.random() * characterList.length)]
	}
	return id
}