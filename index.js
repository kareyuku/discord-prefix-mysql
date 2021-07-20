// Importing important stuff
const Discord = require( 'discord.js' );
const client = new Discord.Client();
const Token = " PUT UR DISCORD TOKEN HERE ";

// Importing our prefixes cache

const prefixCache = require( './prefixCache' );

// Client on ready
client.on( "ready", () => {

    prefixCache.reloadCache( client ); // Reloading our Cache ### Very Important ###

})

// Client on message
client.on( "message", ( m ) => {
    if(m.channel.type == "dm") return false; // If this message was in dm then gonna return
    let prefix = prefixCache.getCache( m.guild.id ); // Getting Prefix

    if( !m.content.startsWith( prefix ) ) return false; // Checking if message starting with our Prefix if not then gonna return

    /*
    Coded by Bartuś
    */

})

// Turn on bot
client.login( Token );
