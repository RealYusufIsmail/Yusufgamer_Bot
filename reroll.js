const ms =  require('ms');
const { description, run } = require('./giveaways');


module.exports = {
    name:  "reroll",
    description: "Reroll giveaway",

    async run (client, message, args){

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You dont have permissions to reroll the giveaway.');

        if(!args[0]) return message.channel.send('No giveaway ID provided');

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway) return message.channel.send('Could not find a giveaway with that ID/name.');  

        client.giveawaysManager.reroll(giveaway.messageID)
          .then(() => {
            message.channel.send('The giveaway has been rerolled.')
        })
        .catch((e) =>{
            if(e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)){
               message.channel.send('The giveaway has not ended yet.') 
            } else{
                console.error(e);
                message.channel.send('404 ERROR.')
            }
        
        })
    }
}