import { IMessage } from "../components/MessageBoard"

export const sortDesc = (a: IMessage, b: IMessage): number => b.id - a.id
