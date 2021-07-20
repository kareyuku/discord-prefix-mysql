const prefixes = { /* Here prefixes gonna save */ }

const database = require( './database' )

const defaultPrefix = "!"

module.exports.reloadCache = async ( client ) => {
    for( let discordGuild of client.guilds.cache.array() ) {
        // Getting guild prefix
        const [results] = await database.promise().query(`SELECT * FROM guildPrefixes WHERE serverid = ?`, [serverid]).catch(() => {return defaultPrefix });
        if(results.length > 0) return results[0].prefix;
        // If not custom Prefix then returing the default one
        return defaultPrefix
    }
}

module.exports.addCache = async ( serverid, prefix ) => {
    const [results] = await database.promise().query(`SELECT * FROM guildPrefixes WHERE serverid = ?`, [serverid])
    if(results.length > 0) {
        database.execute('UPDATE guildPrefixes SET prefix = ? WHERE serverid = ?', [ prefix, serverid ]) // If exists in database then editing old prefix to new one
        return prefixes[ serverid ] = prefix; // Adding to prefixes cache
    }
    database.execute('INSERT INTO guildPrefixes (serverid, prefix) VALUES (?, ?)', [ serverid, prefix ]) // If not in database yet then adding to database
    return prefixes[ serverid ] = prefix; // Adding to prefixes cache
}

module.exports.getCache = async ( serverid ) => {
    return prefixes[ serverid ] || defaultPrefix // If prefixes have define prefix for this guild then gonna return guild prefix otherwise gonna return default prefix
}