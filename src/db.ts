import { DB } from "../deps.ts"
import "https://deno.land/x/dotenv@v3.0.0/load.ts";

const dbfile = Deno.env.get('OMEGA_DB')

export const db = new DB(`./${dbfile}`);

export function dbInit() {
    db.query(`CREATE TABLE IF NOT EXISTS guilds(id TEXT NOT NULL PRIMARY KEY, prefix TEXT NOT NULL DEFAULT '~', welcome_url TEXT, welcome_message TEXT, added_at INTEGER)`)
}

export function setGuildPrefix(guild: string, prefix: string) {
    db.query(
        `INSERT INTO guilds(id, prefix, added_at) VALUES(?, ?, ?) ON CONFLICT(id) DO UPDATE SET prefix = ?;`,
        [guild, prefix, +new Date(), prefix]
    )
}

export function getGuildPrefix(guild: string) {
    return db.query(`SELECT prefix FROM guilds WHERE id = ?`, [guild])[0]
}

export function setGuildWelcomeUrl(guild: string, url: string) {
    db.query(
        `INSERT INTO guilds(id, welcome_url, added_at) VALUES(?, ?, ?) ON CONFLICT(id) DO UPDATE SET welcome_url = ?;`,
        [guild, url, +new Date(), url]
    )
}

export function getGuildWelcomeUrl(guild: string) {
    return db.query(`SELECT welcome_url FROM guilds WHERE id = ?`, [guild])[0]
}
