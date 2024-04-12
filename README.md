## Table Of Contents

 - [What Is It ?](#what-is-it)
 - [Installing](#installing)
 - [Functions Examples](#functions)
 - isValidValue()
   - Check Specific Permission Value Is Valid Or Not
  - valueOf()
    - Get The Value Of Specific Permission Name(s)
  - valueToName()
    - Convert Permission Value Into Readable Name(s)
  - has()
    - Check If Some Permissions Have Specific Permission(s) Or Not

## What Is It

- `discord.js-permissions` Is A Utility To Deal With Discord Permissions Easily

## Installing

```bash
$ npm i discord.js-permissions
```

## Functions
 ### `isValidValue()`:
 ```js
  const { isValidValue } = require("discord.js-permissions");

  console.log(isValidValue(0)) // false
  console.log(isValidValue(1298371283)) // true
  console.log(isValidValue("1298371283")) // true
  console.log(isValidValue("Administrator")) // false
  console.log(isValidValue(1)) // true
  console.log(isValidValue(93471298417843)) // true
 ``` 
 ### `valueOf()`:
 ```js
  const { valueOf } = require("discord.js-permissions");

  console.log(valueOf(1)) // null
  console.log(valueOf("Administrator")) // 8
  console.log(valueOf("AdMiNiStRaToR")) // 8
  console.log(valueOf([
    "Send_Messages",
    "View_Channel"
  ])) // 3072
  console.log(valueOf([
    "SENDMESSAGES",
    "VIEW_CHANNEL"
  ])) // 3072

  console.log(valueOf([
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'VIEW_AUDIT_LOG',
    'VIEW_CHANNEL',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'VIEW_GUILD_INSIGHTS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_GUILD_EXPRESSIONS'
  ])) // 2072638643
 ```

 ### `valueToName()`:
 ```js
  const { valueToName } = require("discord.js-permissions");

  console.log(valueToName(1)); // CREATE_INSTANT_INVITE
  console.log(valueToName(8)); // ADMINISTRATOR
  console.log(valueToName(0x400)); // VIEW_CHANNEL
  console.log(valueToName("0x800")); // SEND_MESSAGES
  console.log(valueToName(3072)); // [ 'VIEW_CHANNEL', 'SEND_MESSAGES' ]
  console.log(valueToName(2072638643)); 
  /*[
        'CREATE_INSTANT_INVITE',
      'KICK_MEMBERS',
      'MANAGE_CHANNELS',
      'MANAGE_GUILD',
      'VIEW_AUDIT_LOG',
      'VIEW_CHANNEL',
      'SEND_TTS_MESSAGES',
      'MANAGE_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'VIEW_GUILD_INSIGHTS',
      'DEAFEN_MEMBERS',
      'MOVE_MEMBERS',
      'USE_VAD',
      'MANAGE_NICKNAMES',
      'MANAGE_ROLES',
      'MANAGE_WEBHOOKS',
      'MANAGE_GUILD_EXPRESSIONS'
  ]*/
 ```

 ### `has()`:
 ```js
  const { Permission, valueOf } = require("discord.js-permissions");

  let p = new Permission();

  console.log(p.has("Administrator", "Moderate_Members")) // true
  console.log(valueOf([
    'Manage_Roles',
    'Kick_Members'
  ])) // 268435458
  console.log(p.has(268435458, 'Send_Messages')) // false
  console.log(p.has(268435458, 'Kick Members')) // true
 ```