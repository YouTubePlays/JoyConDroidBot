const Discord = require('discord.js');
const Config = require('./config.json');


const avatarImageUrl = 'https://cdn.discordapp.com/app-icons/667985257189998632/068eb2ff8da13ff0ec900d014fca9b46.png';
const joyConDroidAppUrl = 'https://play.google.com/store/apps/details?id=com.rdapps.gamepad';

const client = new Discord.Client();

function helpEmbed(channel) {
  const helpEmbed = new Discord.RichEmbed()
    .setColor('#0AB9E6')
    .setTitle('Available Help Messages:')
    .setAuthor('JoyConDroid', avatarImageUrl, joyConDroidAppUrl)
    .addField('$jc disconnect', 'Explains what do you need to do to fix disconnects.')
    .addField('$jc compatibility', 'Explains which devices are compatible.')
    .addField('$jc gamepad', 'Explains how to connect a gamepad.');
  channel.send(helpEmbed);
}

function disconnectEmbed(channel) {
  const disconnectEmbed = new Discord.RichEmbed()
    .setColor('#0AB9E6')
    .setTitle('Disconnection Problem:')
    .setDescription('My device disconnects from the Switch after leaving the ‘Change Grip/Order’ screen.')
    .setAuthor('JoyConDroid', avatarImageUrl, joyConDroidAppUrl)
    .addField('Optional', 
    `Input your Android Device’s Bluetooth MAC address into Joy-Con Droid when requested by the app to ensure ` +
    `your device remains connected for certain Switch games.`)
    .addField('1.', 
    `Turn off Bluetooth on your Android Device and disconnect your chosen Controller from your device’s status bar.`)
    .addField('2.', 
    `Choose your Controller in Joy-Con Droid so that it turns on Bluetooth for you and allow the prompt to make your ` +
    `device visible to other Bluetooth devices again.`)
    .addField('3.', 
    `Go to the Change Grip/Order screen on your Switch`)
    .addField('4.', 
    `Your Android Device will prompt you for pairing to the Switch. Don’t touch anything yet.`)
    .addField('5.', 
    `Exit the Change Grip/Order screen on the Switch and then accept the pairing request on your Android Device.`);
  channel.send(disconnectEmbed);
}

function compatiblityEmbed(channel) {
  const compatiblityEmbed = new Discord.RichEmbed()
    .setColor('#0AB9E6')
    .setTitle('Device Compatibility:')
    .setDescription('My device has Android 9 (Pie) or later firmware but does not work or isn’t compatible.')
    .setAuthor('JoyConDroid', avatarImageUrl, joyConDroidAppUrl)
    .addField('Info', 
    `Some Android Device manufacturers such as OnePlus, Huawei, LG, Sony, and Xiaomi have not included ` +
    `the Bluetooth Human Interface Device (HID) Profile capabilities necessary for Joy-Con Droid to function ` + 
    `as a Controller in their stock firmware. It is possible for this to be added through device software ` +
    `updates but it will vary between device manufacturers. If you want to get around this, you would have ` +
    `to flash a custom ROM such as Lineage OS 16.0 or similar AOSP ROM that is at least Android 9. You may ` +
    `use the Bluetooth HID Profile Tester app to check if your Android device has the necessary capabilities. ` +
    `Joy-Con Droid also does not work with devices below Android 9.`);
  channel.send(compatiblityEmbed);
}

function gamepadEmbed(channel) {
  const gamepadEmbed = new Discord.RichEmbed()
    .setColor('#0AB9E6')
    .setTitle('Gamepad Usage:')
    .setDescription('My Gamepad isn’t working with Joy-Con Droid.')
    .setAuthor('JoyConDroid', avatarImageUrl, joyConDroidAppUrl)
    .addField('Info', 
    `Joy-Con Droid can only work with most Android-compatible gamepads ` +
    `connected to your Android Device through a USB connection. Bluetooth-connected ` +
    `gamepads will not work wirelessly because of the way Joy-Con Droid utilizes the Bluetooth connection with the Switch.`);
  channel.send(gamepadEmbed);
}

client.on("ready", () => {
  client.user.setActivity("Help $jc", { type: "PLAYING"});
})

client.on('message', msg => {
  let content = msg.content;
  if (content && content.startsWith('$jc')) {
    let args =  content.split(/\s+/);
    if (args.length < 2) {
        helpEmbed(msg.channel);
    } else {
      let command = args[1].toLocaleLowerCase();
      if(command === 'disconnect') {
        disconnectEmbed(msg.channel);
      }
      if(command === 'compatibility') {
        compatiblityEmbed(msg.channel);
      }
      if(command === 'gamepad') {
        gamepadEmbed(msg.channel);
      }
    }
  }
});

client.login(Config.token);