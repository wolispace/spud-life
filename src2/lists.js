const lists = {

  get: function (key) {
    return lists.raw[key][rnd(lists.raw[key].length)];
  },

  // compressed the entire raw list.. console.log out, replace compressed and build needs to delete raw:
  compress: function () {
    compressed = LZString.compressToUTF16(JSON.stringify(lists.raw));
    console.log(`compressed: "${compressed}",`);
  },

  // decompress the compress: into raw: 
  decompress: function () {
    if (lists.compressed != '') {
      lists.raw = JSON.parse(LZString.decompressFromUTF16(lists.compressed));
    } else {
      console.log('nothing to decompress');
    }
  },

  raw: {
    insideList: [
      "is a little messy",
      "looks so much nicer after that fresh coat of paint",
      "is small",
      "is bigger on the inside",
      "is where you lay your hat",
      "is a very nice house",
      "looks a lot like my house",
      "is your castle",
      "is cozy",
    ],
    dreamList: [
      "You dreamt of living in a park, but were rudely awoken by the dustmen",
      "You dreamt you were a walrus",
      "You dreamt of holding onto nothing, to see how long nothing lasts",
      "You dreamt of spinning plates",
      "You didn't dream of anything, however you wake up, back to life, back to reality",
      "You dreamt you were a hero, just for one day",
      "You dreamt a little dream of me",
      "You dreamt the cake was a lie",
      "You dreamt about the delivery man",
      "You dreamt you were Baba",
      "You dreamt that you finally wound up like a spring",
      "you dreamt that the sun machine was coming down and you had a party",
      "You dreamt you were in a boat on a river with tangerine trees and marmalade skies",
    ],
    gameList: [
      "Portal",
      "Baba Is You",
      "Skyrim",
      "The Saboteur",
      "The Stanley Parable",
      "Visual Pinball X",
      "with ChatGPT",
      "Tony Hawk's P_o ___tater 2"
    ],
    sleepList: [
      "You got to sleep quickly.",
      "You had a hard time getting to sleep.",
      `You stayed up very late playing [gameList] and didn't get much sleep.`,
      `You were up late fixing your scanner, you're handy like that.`,
      "Your pillow was unusually lumpy, maybe its time for a new one?",
      "You noticed a rabbit-shaped crack on your ceiling.",
      "You re-watched The Empire Strikes Back yet again, just to see they used spuds for asteroids.",
    ],
    dayMsgList: [
      `Day [days]`,
      `It's day [days]`,
      `Nice going, day [days]`,
      `Right on, day [days]`,
      `Woo hoo, day [days]`,
      `[days] days of digging`,
      `[days] days`,
      `[days] days and counting`,
      `[days] days, what fun`,
      `[days] days for [days] spuds?`,
      `[days] sunrises`,
      `[days] days of adventure`,
    ],
    okText: [
      "Ok",
      "Okay",
      "Righto",
      "Gotcha",
      "I see",
      "Interesting",
      "Thanks",
      "Got that",
      "Roger",
      "Understood",
      "Aha",
      "Go",
      "Cool",
      "Yes",
      "Yup",
      "Makes sense",
      "Agreed",
      "Affirmative",
    ],
    randomHint: [
      "You may find things other than potatoes buried beneath you",
      `There are [maxScan] levels of scanner upgrade. The [maxScan]th shows what's directly under you`,
      "Everything is saved, all the time (in your browser's local storage)",
      "If you have a keyboard, use cursor, space, enter and escape keys",
      "It takes 30 random white circles to make one cloud",
      "The rarest potatoes are found on the furthest fields",
    ],
    hintPrompts: [
      ['You'],
      [
        'Yes, you',
        'Like I said, you',
        'Again, you',
        'I repeat, you',
      ],
      [
        'One more time, you',
        `I'll say it again, you`,
        'For the third time, you',
      ],
      [
        'Ahem.. You',
        'Oi! You',
        'Hay! You',
        "What!? You"
      ],
      [
        `Pay attention, you`,
        `It's actually quite important, you`,
        `I told you before and I'll tell you again, you`,
        `Its important that you know, you`,
      ],
      [
        `Really!! You`,
        `Wow! Look at you! You`,
        `I'm impressed with your stamina. You`,
      ],
      [
        `For the umpteenth time, you`,
        `For the last time!! You`,
        `Didn't I just tell you? You`,
      ],
      [
        `I don't think you understand. You`,
        'Maybe you were not paying attention, you',
        'Really? Really!?! You',
        'What! What!!  You',
      ],
      [
        `Ok, one more time, you`,
        'Listen up, you',
        'Pay attention, you',
        'Maybe I didn`t make myself clear, you',
      ],
      [
        `I'm getting tired of reminding you that you`,
      ],
      [
        `I'm exhausted! You`,
      ],
      [
        `Ok, you win. This is the last. You`,
      ]
    ],
  },

  compressed: '',

};
