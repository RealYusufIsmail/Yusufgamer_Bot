const ms = require('ms');

module.exports = {
   name: "giveaway",
   description: "Start a giveaway",


   async run(client, message, args) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You dont have permission to start a giveaway');


      let channel = message.mention.channels.first();

      if (!channel) return message.channel.send('Please provied a channel which you want the giveaway to be in');

      let giveawayDuration = args[1];

      if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Please provide a valid duration');

      let giveawayWinners = args[2];

      if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Please provide a valid number of winners!');

      let giveawayPrize = args.slice(3).join(" ");

      if (!giveawayPrize) return message.channel.send('Ok then,I will give away nothing');

      client.giveawayManger.start(channel, {
         time: ms(giveawayDuration),
         prize: giveawayPrize,
         winnerCount: giveawayWinners,
         hostedBy: client.config.hostedBy ? message.author : null,

         messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY",
            giveawayEned: (client.config.everyoneMention ? "@everyone\n\n" : "") + "GIVEAWAY ENDED.",
            timeRemaining: "Time remaining: **{duration}**",
            inviteToParticipate: "React with 🎉 to enter the giveaway:",
            winMessage: "congratulations {winner} you have won the giveaway. Dm the person who hosted the giveaway to claim your **{prize}**.",
            embedFooter: "Giveaway Time!",
            noWinner: "Error 404, Could not determine a winner",
            hostedBy: "Hosted by {user}",
            winners: "winner(s)",
            endedAt: "Ends at",
            units: {
               seconds: "seconds",
               minutes: "minutes",
               hours: "hours",
               days: "days",
               Plurals: false

            }
         }
      })



      message.channel.send(`Giveaway starting in ${channel}`);  
   }
}