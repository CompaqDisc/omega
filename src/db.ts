import { DB } from "../deps.ts"
import "https://deno.land/x/dotenv@v3.0.0/load.ts";

const dbfile = Deno.env.get('OMEGA_DB')
const db = new DB(`./${dbfile}`)

export class OmegaDB {
    static readonly default_prefix = Deno.env.get('DEFAULT_PREFIX');

    static init() {
        db.query(
            `CREATE TABLE IF NOT EXISTS guilds(
                "id" TEXT NOT NULL PRIMARY KEY,
                "added_at" INTEGER,
                "setting.prefix" TEXT NOT NULL DEFAULT '~',
                "setting.welcome.enabled" TEXT NOT NULL DEFAULT 'true',
                "setting.welcome.message" TEXT NOT NULL DEFAULT 'Thanks for joining us!',
                "setting.welcome.url" TEXT
            )`
        )
    }

    static setGuildPrefix(guildId: string | undefined, prefix: string) {
        if (guildId === undefined) return

        db.query(
            `INSERT INTO guilds(id, added_at, setting.prefix) VALUES(?, ?, ?) ON CONFLICT(id) DO UPDATE SET "setting.prefix" = ?;`,
            [guildId, +new Date(), prefix, prefix]
        )
    }

    static getGuildPrefix(guildId: string | undefined) {
        if (guildId === undefined) return OmegaDB.default_prefix

        const row = db.query(`SELECT "setting.prefix" FROM guilds WHERE id = ?`, [guildId])[0]
        if (row === undefined) return OmegaDB.default_prefix

        return row[0] as string
    }

    static setGuildWelcomeEnabled(guildId: string | undefined, state: boolean) {
        if (guildId === undefined) return

        db.query(
            `INSERT INTO guilds(id, added_at, setting.welcome.enabled) VALUES(?, ?, ?) ON CONFLICT(id) DO UPDATE SET "setting.welcome.enabled" = ?;`,
            [guildId, +new Date(), state, state]
        )
    }

    static isGuildWelcomeEnabled(guildId: string | undefined): boolean {
        if (guildId === undefined) return true

        const row = db.query(`SELECT "setting.welcome.enabled" FROM guilds WHERE id = ?`, [guildId])[0]
        if (row === undefined) return true

        const value = row[0]
        if (typeof value === 'string') return value.toLowerCase() === 'true' || !!+value
        return !!value
    }

    static setGuildWelcomeUrl(guildId: string | undefined, welcomeUrl: string) {
        if (guildId === undefined) return

        db.query(
            `INSERT INTO guilds(id, added_at, setting.welcome.url) VALUES(?, ?, ?) ON CONFLICT(id) DO UPDATE SET "setting.welcome.url" = ?;`,
            [guildId, +new Date(), welcomeUrl, welcomeUrl]
        )
    }

    static getGuildWelcomeUrl(guildId: string | undefined) {
        if (guildId === undefined) return undefined

        const row = db.query(`SELECT "setting.welcome.url" FROM guilds WHERE id = ?`, [guildId])[0]
        if (row === undefined) return undefined

        return row[0] as string
    }

    static setGuildWelcomeMessage(guildId: string | undefined, welcomeMessage: string) {
        if (guildId === undefined) return

        db.query(
            `INSERT INTO guilds(id, added_at, setting.welcome.message) VALUES(?, ?, ?) ON CONFLICT(id) DO UPDATE SET "setting.welcome.message" = ?;`,
            [guildId, +new Date(), welcomeMessage, welcomeMessage]
        )
    }

    static getGuildWelcomeMessage(guildId: string | undefined) {
        if (guildId === undefined) return undefined

        const row = db.query(`SELECT "setting.welcome.message" FROM guilds WHERE id = ?`, [guildId])[0]
        if (row === undefined) return undefined

        return row[0] as string
    }
}