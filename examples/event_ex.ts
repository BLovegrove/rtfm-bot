import { Client } from "discord.js"

export const event = {
    name: "",
    async listen(client: Client) {
        client.on("eventName", () => {
            //do thing
            return
        })
    }
}