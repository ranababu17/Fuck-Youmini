module.exports = {
  config: {
    name: "topexp",
    version: "1.0",
    author: "Samir",
    role: 0,
    description: {
      en: "his module displays the top 10 users based on their exp points."
    },
    category: "economy",
    guide: {
      en: "{pn}"
    }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const allUsers = await usersData.getAll();
    
    // Filter out users with no experience points
    const usersWithExp = allUsers.filter(user => user.exp > 0);

    if (usersWithExp.length < 10) {
      message.reply("There are not enough users with experience points to display a top 10.");
      return;
    }
    
    const topExp = usersWithExp.sort((a, b) => b.exp - a.exp).slice(0, 10);
    
    const topUsersList = topExp.map((user, index) => `${index + 1}. ${user.name}: ${user.exp}`);
    
    const messageText = `Top 10 Rank Users:\n${topUsersList.join('\n')}`;
    
    message.reply(messageText);
  }
};