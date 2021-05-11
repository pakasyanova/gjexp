var showProgressBar = true;

// Main shuffleSequence definition
var shuffleSequence = seq(
    'consent',
    'setcounter',
    'intro',
    'practice',
    sepWith("sep", rshuffle(startsWith('ROCOUT'),startsWith('Filler'))),
    'debrief',
    );


//completion messages
var sendingResultsMessage = "Please wait. Your data are being sent to the server.";
var completionMessage = "Thank you for your participation. Your completion code is 1139A862. To complete this experiment, go to: https://app.prolific.co/submissions/complete?cc=1139A862.";
var completionErrorMessage = "There was an error in sending your data to the server. You may still complete this experiment. Your completion code is VW2LJVTR. Please go to: https://app.prolific.ac/submissions/complete?cc=VW2LJVTR.";; 

var EPD = "EPDashedSentence";
var DS = "DashedSentence";
var QQ = "QQuestion";

var defaults = [
    EPD, {
        mode: 'speeded acceptability',
        display: 'in place',
        blankText: '+',
        wordTime: 1000,
        wordPauseTime: 100
        },
    DS, {
        mode: "speeded acceptability",
        display: "in place",
        blankText: "-",
        wordTime: 225,
        wordPauseTime: 100,
    },
    QQ, {
        showNumbers: false,
        wordPauseTime: 100,
        autoFirstChar: true,
        as: ["f", "j"],
        presentAsScale: true,
        instructions: "",
        leftComment: ""
    },
];


// Add breaks every 20 items
function modifyRunningOrder(ro)
{
    for (var i = 0; i < ro.length; ++i)
    {
        if (i % 20 == 10 && i > 30)
        {
            ro[i].push(new DynamicElement(
                "Message",
                {html: "<p>Please take a short break. As a reminder, you want to say if you thought the sentence was acceptable. 'F' = Yes, acceptable and 'J' = No, unacceptable. Make sure to keep them straight! Press any button to continue when you're ready.</p>", transfer: "keypress"},
            true));
            ro[i].push(new DynamicElement(
                "Separator",
                {transfer: 2500, normalMessage: "Hands in place! The sentences are about to begin again."},
            true));
        }
    }
    return ro;
}

// Items array.
var items = [

["setcounter", "__SetCounter__", { }],
["timeoutSep", Separator, { transfer: 250, normalMessage: "", errorMessage: "Timed out. Please respond more quickly."}],

["sep", "Separator", {transfer: 250, normalMessage: ""}],

["consent", "Form", {consentRequired: true, html: {include: "consent.html"}}],
["debrief", "Form", {consentRequired: true, html: {include: "debrief.html"}}],
["exit", "Form", {consentRequired: true, html: {include: "exit.html"}}],

["intro", "Form", {consentRequired: true, html: {include: "intro1.html"}}],
["intro", "Form", {consentRequired: true, html: {include: "intro2.html"}}],
["intro", "Form", {consentRequired: true, html: {include: "intro3.html"}}],
["intro", "Form", {consentRequired: true, html: {include: "intro4.html"}}],       

["practice", Message, {consentRequired: false,
                   html: ["div",
                           ["p", "Let's try the first practice item. After clicking the link you should get your hands ready. Your left pointer finger should be on 'F' and your right pointer finger on 'J'."]
                         ]}],

['practice',"Separator",{transfer: 2500, normalMessage: "Get your hands in place!"}],


["practice", "EPDashedSentence", {s:"+"}, "DashedSentence", {s: "I know that those cats definitely"},"Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, "QQuestion", {q: "is"}],


["practice", Message, {consentRequired: false,
                  html: ["div",
                          ["p", "How was that? That item is one that some, but not all, English speakers judge to be unacceptable."],
                          ["p", "Let's try another one."]
                        ]}],

['practice',"Separator",{transfer: 2500, normalMessage: "Get your hands in place!"}],

["practice", "EPDashedSentence", {s:"+"}, "DashedSentence", {s: "I saw that the students definitely"},"Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, "QQuestion", {q: "are"}],

["practice", Message, {consentRequired: false,
                  html: ["div",
                          ["p", "That probably felt different than the last one. Many English speakers judge that last sentence to be acceptable."],
                          ["p", "Now let's try a few in a row. These will be longer, and more similar to the ones you'll see in the experiment"]
                        ]}],

['practice',"Separator",{transfer: 2500, normalMessage: "Get your hands in place!"}],

["practice", "EPDashedSentence", {s:"+"}, "DashedSentence", {s: "The prince waltzed with every girl who he"},"Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, "QQuestion", {q: "are"}],

["practice", "Separator", {transfer: 250, normalMessage: ""}],

["practice", "EPDashedSentence", {s:"+"}, "DashedSentence", {s: "I turned and screamed at the waiter who the customers always"},"Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, "QQuestion", {q: "is"}],

["practice", "Separator", {transfer: 250, normalMessage: ""}],

["practice", "EPDashedSentence", {s:"+"}, "DashedSentence", {s: "Did you sit up all night worrying about the man who"},"Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, "QQuestion", {q: "is"}],

["practice", Message, {consentRequired: false,
                  html: ["div",
                          ["p", "Alright, that's it for practice!"],
                          ["p", "Remember: 'F' = acceptable and 'J' = unacceptable."],
                          ["p", "Press the link when you're ready to begin, and please pay attention throughout the experiment. Have Fun!"]
                        ]}],


[["ROCOUT-MultiMatch",1], EPD, {s:"+"}, EPD, {s:"+"}, DS, {s:"From across the room, Armand spotted the cousin of the painter who, at any given opportunity,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "knits"}],
[["ROCOUT-HighMatch",1], EPD, {s:"+"}, EPD, {s:"+"}, DS, {s:"From across the room, Armand spotted the cousin of the painters who, at any given opportunity,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "knits"}],
[["ROCOUT-LowMatch",1], EPD, {s:"+"}, EPD, {s:"+"}, DS, {s:"From across the room, Armand spotted the cousins of the painter who, at any given opportunity,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "knits"}],
[["ROCOUT-NoMatch",1], EPD, {s:"+"}, EPD, {s:"+"}, DS, {s:"From across the room, Armand spotted the cousins of the painters who, at any given opportunity,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "knits"}],

[["ROCOUT-MultiMatch",2], EPD, {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistant of the manager who, from behind the register,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "curses"}],
[["ROCOUT-HighMatch",2], EPD, {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistant of the managers who, from behind the register,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "curses"}],
[["ROCOUT-LowMatch",2], EPD, {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistants of the manager who, from behind the register,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "curses"}],
[["ROCOUT-NoMatch",2], EPD, {s:"+"}, DS, {s:"At the meeting, Belinda greeted the assistants of the managers who, from behind the register,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "curses"}],

[["ROCOUT-MultiMatch",3], EPD, {s:"+"}, DS, {s:"In the lobby, Clyde bumped into the chauffeur of the CEO who, despite a pressing obligation,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "is"}],
[["ROCOUT-HighMatch",3], EPD, {s:"+"}, DS, {s:"In the lobby, Clyde bumped into the chauffeur of the CEOs who, despite a pressing obligation,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "is"}],
[["ROCOUT-LowMatch",3], EPD, {s:"+"}, DS, {s:"In the lobby, Clyde bumped into the chauffeurs of the CEO who, despite a pressing obligation,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "is"}],
[["ROCOUT-NoMatch",3], EPD, {s:"+"}, DS, {s:"In the lobby, Clyde bumped into the chauffeurs of the CEOs who, despite a pressing obligation,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "is"}],

[["ROCOUT-MultiMatch",4], EPD, {s:"+"}, DS, {s:"Daria crossed the quad to speak to the coworkers of the administrators who, earlier in the afternoon,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",4], EPD, {s:"+"}, DS, {s:"Daria crossed the quad to speak to the coworkers of the administrator who, earlier in the afternoon,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",4], EPD, {s:"+"}, DS, {s:"Daria crossed the quad to speak to the coworker of the administrators who, earlier in the afternoon,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-NoMatch",4], EPD, {s:"+"}, DS, {s:"Daria crossed the quad to speak to the coworker of the administrator who, earlier in the afternoon,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-MultiMatch",5], EPD, {s:"+"}, DS, {s:"Edwin has been reading about the sister of the actor who, a decade before broadway,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",5], EPD, {s:"+"}, DS, {s:"Edwin has been reading about the sister of the actors who, a decade before broadway,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",5], EPD, {s:"+"}, DS, {s:"Edwin has been reading about the sisters of the actor who, a decade before broadway,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",5], EPD, {s:"+"}, DS, {s:"Edwin has been reading about the sisters of the actors who, a decade before broadway,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",6], EPD, {s:"+"}, DS, {s:"From the gallery, Franny observed the nurse of the surgeon who, one time last year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",6], EPD, {s:"+"}, DS, {s:"From the gallery, Franny observed the nurse of the surgeons who, one time last year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",6], EPD, {s:"+"}, DS, {s:"From the gallery, Franny observed the nurses of the surgeon who, one time last year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",6], EPD, {s:"+"}, DS, {s:"From the gallery, Franny observed the nurses of the surgeons who, one time last year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",7], EPD, {s:"+"}, DS, {s:"Gerald introduced himself to the niece of the billionaire who, twice each lunar month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sails"}],
[["ROCOUT-HighMatch",7], EPD, {s:"+"}, DS, {s:"Gerald introduced himself to the niece of the billionaires who, twice each lunar month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sails"}],
[["ROCOUT-LowMatch",7], EPD, {s:"+"}, DS, {s:"Gerald introduced himself to the nieces of the billionaire who, twice each lunar month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sails"}],
[["ROCOUT-NoMatch",7], EPD, {s:"+"}, DS, {s:"Gerald introduced himself to the nieces of the billionaires who, twice each lunar month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sails"}],

[["ROCOUT-MultiMatch",8], EPD, {s:"+"}, DS, {s:"Hilda was only vaguely acquainted with the relative of the celebrity who, at the luxurious banquet,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",8], EPD, {s:"+"}, DS, {s:"Hilda was only vaguely acquainted with the relative of the celebrities who, at the luxurious banquet,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",8], EPD, {s:"+"}, DS, {s:"Hilda was only vaguely acquainted with the relatives of the celebrity who, at the luxurious banquet,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",8], EPD, {s:"+"}, DS, {s:"Hilda was only vaguely acquainted with the relatives of the celebrities who, at the luxurious banquet,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",9], EPD, {s:"+"}, DS, {s:"At the press conference, Isaac recorded the translator of the ambassador who, with every passing second,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "jokes"}],
[["ROCOUT-HighMatch",9], EPD, {s:"+"}, DS, {s:"At the press conference, Isaac recorded the translator of the ambassadors who, with every passing second,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "jokes"}],
[["ROCOUT-LowMatch",9], EPD, {s:"+"}, DS, {s:"At the press conference, Isaac recorded the translators of the ambassador who, with every passing second,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "jokes"}],
[["ROCOUT-NoMatch",9], EPD, {s:"+"}, DS, {s:"At the press conference, Isaac recorded the translators of the ambassadors who, with every passing second,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "jokes"}],

[["ROCOUT-MultiMatch",10], EPD, {s:"+"}, DS, {s:"During the budget negotiation, Janet charmed the assistant of the executive who, at a later date,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "decides"}],
[["ROCOUT-HighMatch",10], EPD, {s:"+"}, DS, {s:"During the budget negotiation, Janet charmed the assistant of the executives who, at a later date,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "decides"}],
[["ROCOUT-LowMatch",10], EPD, {s:"+"}, DS, {s:"During the budget negotiation, Janet charmed the assistants of the executive who, at a later date,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "decides"}],
[["ROCOUT-NoMatch",10], EPD, {s:"+"}, DS, {s:"During the budget negotiation, Janet charmed the assistants of the executives who, at a later date,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "decides"}],

[["ROCOUT-MultiMatch",11], EPD, {s:"+"}, DS, {s:"On the fishing trip, we laughed at the uncle of the sailor who, every week this month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",11], EPD, {s:"+"}, DS, {s:"On the fishing trip, we laughed at the uncle of the sailors who, every week this month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",11], EPD, {s:"+"}, DS, {s:"On the fishing trip, we laughed at the uncles of the sailor who, every week this month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",11], EPD, {s:"+"}, DS, {s:"On the fishing trip, we laughed at the uncles of the sailors who, every week this month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",12], EPD, {s:"+"}, DS, {s:"At trial, we scrutinized the prisoner of the FBI agent who, only an hour ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",12], EPD, {s:"+"}, DS, {s:"At trial, we scrutinized the prisoner of the FBI agents who, only an hour ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",12], EPD, {s:"+"}, DS, {s:"At trial, we scrutinized the prisoners of the FBI agent who, only an hour ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",12], EPD, {s:"+"}, DS, {s:"At trial, we scrutinized the prisoners of the FBI agents who, only an hour ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",13], EPD, {s:"+"}, DS, {s:"During the demonstration, you photographed the soldier of the lieutenant who, later in the day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",13], EPD, {s:"+"}, DS, {s:"During the demonstration, you photographed the soldier of the lieutenants who, later in the day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",13], EPD, {s:"+"}, DS, {s:"During the demonstration, you photographed the soldiers of the lieutenant who, later in the day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",13], EPD, {s:"+"}, DS, {s:"During the demonstration, you photographed the soldiers of the lieutenants who, later in the day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",14], EPD, {s:"+"}, DS, {s:"Karl recognized the hostage of the pirate who, just one month ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",14], EPD, {s:"+"}, DS, {s:"Karl recognized the hostage of the pirates who, just one month ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",14], EPD, {s:"+"}, DS, {s:"Karl recognized the hostages of the pirate who, just one month ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",14], EPD, {s:"+"}, DS, {s:"Karl recognized the hostages of the pirates who, just one month ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",15], EPD, {s:"+"}, DS, {s:"During the play, we all heckled the murderer of the prince who, just a scene prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",15], EPD, {s:"+"}, DS, {s:"During the play, we all heckled the murderer of the princes who, just a scene prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",15], EPD, {s:"+"}, DS, {s:"During the play, we all heckled the murderers of the prince who, just a scene prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",15], EPD, {s:"+"}, DS, {s:"During the play, we all heckled the murderers of the princes who, just a scene prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",16], EPD, {s:"+"}, DS, {s:"Before the party, Lorraine texted the brother of the schoolgirl who, with much misguided confidence,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "raps"}],
[["ROCOUT-HighMatch",16], EPD, {s:"+"}, DS, {s:"Before the party, Lorraine texted the brother of the schoolgirls who, with much misguided confidence,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "raps"}],
[["ROCOUT-LowMatch",16], EPD, {s:"+"}, DS, {s:"Before the party, Lorraine texted the brothers of the schoolgirl who, with much misguided confidence,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "raps"}],
[["ROCOUT-NoMatch",16], EPD, {s:"+"}, DS, {s:"Before the party, Lorraine texted the brothers of the schoolgirls who, with much misguided confidence,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "raps"}],

[["ROCOUT-MultiMatch",17], EPD, {s:"+"}, DS, {s:"At the potluck, Marcus chatted with the aunt of the nun who, twice each summer harvest,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bakes"}],
[["ROCOUT-HighMatch",17], EPD, {s:"+"}, DS, {s:"At the potluck, Marcus chatted with the aunt of the nuns who, twice each summer harvest,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bakes"}],
[["ROCOUT-LowMatch",17], EPD, {s:"+"}, DS, {s:"At the potluck, Marcus chatted with the aunts of the nun who, twice each summer harvest,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bakes"}],
[["ROCOUT-NoMatch",17], EPD, {s:"+"}, DS, {s:"At the potluck, Marcus chatted with the aunts of the nuns who, twice each summer harvest,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bakes"}],

[["ROCOUT-MultiMatch",18], EPD, {s:"+"}, DS, {s:"Everyone in the plague-ravaged village avoided the servant of the sorceress who, in a blind rage,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",18], EPD, {s:"+"}, DS, {s:"Everyone in the plague-ravaged village avoided the servant of the sorceresses who, in a blind rage,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",18], EPD, {s:"+"}, DS, {s:"Everyone in the plague-ravaged village avoided the servants of the sorceress who, in a blind rage,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",18], EPD, {s:"+"}, DS, {s:"Everyone in the plague-ravaged village avoided the servants of the sorceresses who, in a blind rage,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",19], EPD, {s:"+"}, DS, {s:"At the charity show, Noreen nodded to the sidekick of the actor who, only one day prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",19], EPD, {s:"+"}, DS, {s:"At the charity show, Noreen nodded to the sidekick of the actors who, only one day prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",19], EPD, {s:"+"}, DS, {s:"At the charity show, Noreen nodded to the sidekicks of the actor who, only one day prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",19], EPD, {s:"+"}, DS, {s:"At the charity show, Noreen nodded to the sidekicks of the actors who, only one day prior,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-MultiMatch",20], EPD, {s:"+"}, DS, {s:"Someone at the church meeting complained about the secretary of the bishop who, sometime late last month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-HighMatch",20], EPD, {s:"+"}, DS, {s:"Someone at the church meeting complained about the secretary of the bishops who, sometime late last month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-LowMatch",20], EPD, {s:"+"}, DS, {s:"Someone at the church meeting complained about the secretaries of the bishop who, sometime late last month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["ROCOUT-NoMatch",20], EPD, {s:"+"}, DS, {s:"Someone at the church meeting complained about the secretaries of the bishops who, sometime late last month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["ROCOUT-NoMatch",21], EPD, {s:"+"}, DS, {s:"Down at the pub, Ollie gossiped about the patient of the nurse who, sometime earlier in day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",21], EPD, {s:"+"}, DS, {s:"Down at the pub, Ollie gossiped about the patient of the nurses who, sometime earlier in day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",21], EPD, {s:"+"}, DS, {s:"Down at the pub, Ollie gossiped about the patients of the nurse who, sometime earlier in day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",21], EPD, {s:"+"}, DS, {s:"Down at the pub, Ollie gossiped about the patients of the nurses who, sometime earlier in day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",22], EPD, {s:"+"}, DS, {s:"For her art class, Priscilla had been sketching the guru of the student who, this time last semester,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",22], EPD, {s:"+"}, DS, {s:"For her art class, Priscilla had been sketching the guru of the students who, this time last semester,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",22], EPD, {s:"+"}, DS, {s:"For her art class, Priscilla had been sketching the gurus of the student who, this time last semester,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",22], EPD, {s:"+"}, DS, {s:"For her art class, Priscilla had been sketching the gurus of the students who, this time last semester,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",23], EPD, {s:"+"}, DS, {s:"From the lounge you could see the pilot of the millionaire who, just one week ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",23], EPD, {s:"+"}, DS, {s:"From the lounge you could see the pilot of the millionaires who, just one week ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",23], EPD, {s:"+"}, DS, {s:"From the lounge you could see the pilots of the millionaire who, just one week ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",23], EPD, {s:"+"}, DS, {s:"From the lounge you could see the pilots of the millionaires who, just one week ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",24], EPD, {s:"+"}, DS, {s:"Quentin panicked and tried calling the therapist of the widow who, this time last spring,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",24], EPD, {s:"+"}, DS, {s:"Quentin panicked and tried calling the therapist of the widows who, this time last spring,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",24], EPD, {s:"+"}, DS, {s:"Quentin panicked and tried calling the therapists of the widow who, this time last spring,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",24], EPD, {s:"+"}, DS, {s:"Quentin panicked and tried calling the therapists of the widows who, this time last spring,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",25], EPD, {s:"+"}, DS, {s:"No one could seem to find the shipmate of the cadet who, at the crack of dawn,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bugle"}],
[["ROCOUT-LowMatch",25], EPD, {s:"+"}, DS, {s:"No one could seem to find the shipmate of the cadets who, at the crack of dawn,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bugle"}],
[["ROCOUT-HighMatch",25], EPD, {s:"+"}, DS, {s:"No one could seem to find the shipmates of the cadet who, at the crack of dawn,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bugle"}],
[["ROCOUT-MultiMatch",25], EPD, {s:"+"}, DS, {s:"No one could seem to find the shipmates of the cadets who, at the crack of dawn,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bugle"}],

[["ROCOUT-NoMatch",26], EPD, {s:"+"}, DS, {s:"If you flipped the channel, you would see the accomplice of the thief who, once this past year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",26], EPD, {s:"+"}, DS, {s:"If you flipped the channel, you would see the accomplice of the thieves who, once this past year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",26], EPD, {s:"+"}, DS, {s:"If you flipped the channel, you would see the accomplices of the thief who, once this past year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",26], EPD, {s:"+"}, DS, {s:"If you flipped the channel, you would see the accomplices of the thieves who, once this past year,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",27], EPD, {s:"+"}, DS, {s:"Everyone at the party groaned at the bodyguard of the diva who, even after the show,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "smoke"}],
[["ROCOUT-LowMatch",27], EPD, {s:"+"}, DS, {s:"Everyone at the party groaned at the bodyguard of the divas who, even after the show,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "smoke"}],
[["ROCOUT-HighMatch",27], EPD, {s:"+"}, DS, {s:"Everyone at the party groaned at the bodyguards of the diva who, even after the show,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "smoke"}],
[["ROCOUT-MultiMatch",27], EPD, {s:"+"}, DS, {s:"Everyone at the party groaned at the bodyguards of the divas who, even after the show,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "smoke"}],

[["ROCOUT-NoMatch",28], EPD, {s:"+"}, DS, {s:"Despite our appointment, we couldn't get past the secretary of the boardmember who, only a day ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",28], EPD, {s:"+"}, DS, {s:"Despite our appointment, we couldn't get past the secretary of the boardmembers who, only a day ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",28], EPD, {s:"+"}, DS, {s:"Despite our appointment, we couldn't get past the secretaries of the boardmember who, only a day ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",28], EPD, {s:"+"}, DS, {s:"Despite our appointment, we couldn't get past the secretaries of the boardmembers who, only a day ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",29], EPD, {s:"+"}, DS, {s:"You can get a towel from the pool boy of the celebrity who, in the tropical heat,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sunbathe"}],
[["ROCOUT-LowMatch",29], EPD, {s:"+"}, DS, {s:"You can get a towel from the pool boy of the celebrities who, in the tropical heat,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sunbathe"}],
[["ROCOUT-HighMatch",29], EPD, {s:"+"}, DS, {s:"You can get a towel from the pool boys of the celebrity who, in the tropical heat,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sunbathe"}],
[["ROCOUT-MultiMatch",29], EPD, {s:"+"}, DS, {s:"You can get a towel from the pool boys of the celebrities who, in the tropical heat,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sunbathe"}],

[["ROCOUT-NoMatch",30], EPD, {s:"+"}, DS, {s:"Rosalina testified against the detective of the senator who, earlier this very trial,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",30], EPD, {s:"+"}, DS, {s:"Rosalina testified against the detective of the senators who, earlier this very trial,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",30], EPD, {s:"+"}, DS, {s:"Rosalina testified against the detectives of the senator who, earlier this very trial,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",30], EPD, {s:"+"}, DS, {s:"Rosalina testified against the detectives of the senators who, earlier this very trial,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",31], EPD, {s:"+"}, DS, {s:"Before the exhibition, Silas telephoned the friend of the bodybuilder who, once each winter month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "write"}],
[["ROCOUT-LowMatch",31], EPD, {s:"+"}, DS, {s:"Before the exhibition, Silas telephoned the friend of the bodybuilders who, once each winter month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "write"}],
[["ROCOUT-HighMatch",31], EPD, {s:"+"}, DS, {s:"Before the exhibition, Silas telephoned the friends of the bodybuilder who, once each winter month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "write"}],
[["ROCOUT-MultiMatch",31], EPD, {s:"+"}, DS, {s:"Before the exhibition, Silas telephoned the friends of the bodybuilders who, once each winter month,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "write"}],

[["ROCOUT-NoMatch",32], EPD, {s:"+"}, DS, {s:"At her orientation, Tamara recently met the nephew of the professor who, on university owned land,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "paint"}],
[["ROCOUT-LowMatch",32], EPD, {s:"+"}, DS, {s:"At her orientation, Tamara recently met the nephew of the professors who, on university owned land,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "paint"}],
[["ROCOUT-HighMatch",32], EPD, {s:"+"}, DS, {s:"At her orientation, Tamara recently met the nephews of the professor who, on university owned land,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "paint"}],
[["ROCOUT-MultiMatch",32], EPD, {s:"+"}, DS, {s:"At her orientation, Tamara recently met the nephews of the professors who, on university owned land,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "paint"}],

[["ROCOUT-NoMatch",33], EPD, {s:"+"}, DS, {s:"Everyone at the coffeeshop sympathized with the courier of the florist who, on one embarassing ocassion,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-LowMatch",33], EPD, {s:"+"}, DS, {s:"Everyone at the coffeeshop sympathized with the courier of the florists who, on one embarassing ocassion,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-HighMatch",33], EPD, {s:"+"}, DS, {s:"Everyone at the coffeeshop sympathized with the couriers of the florist who, on one embarassing ocassion,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["ROCOUT-MultiMatch",33], EPD, {s:"+"}, DS, {s:"Everyone at the coffeeshop sympathized with the couriers of the florists who, on one embarassing ocassion,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],

[["ROCOUT-NoMatch",34], EPD, {s:"+"}, DS, {s:"Despite the good press, we didn't really like the commander of the soldier who, in a distracting manner,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "whistle"}],
[["ROCOUT-LowMatch",34], EPD, {s:"+"}, DS, {s:"Despite the good press, we didn't really like the commander of the soldiers who, in a distracting manner,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "whistle"}],
[["ROCOUT-HighMatch",34], EPD, {s:"+"}, DS, {s:"Despite the good press, we didn't really like the commanders of the soldier who, in a distracting manner,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "whistle"}],
[["ROCOUT-MultiMatch",34], EPD, {s:"+"}, DS, {s:"Despite the good press, we didn't really like the commanders of the soldiers who, in a distracting manner,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "whistle"}],

[["ROCOUT-NoMatch",35], EPD, {s:"+"}, DS, {s:"No one quite knew how to respond to the buddy of the janitor who, without a hint of remorse,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "burp"}],
[["ROCOUT-LowMatch",35], EPD, {s:"+"}, DS, {s:"No one quite knew how to respond to the buddy of the janitors who, without a hint of remorse,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "burp"}],
[["ROCOUT-HighMatch",35], EPD, {s:"+"}, DS, {s:"No one quite knew how to respond to the buddies of the janitor who, without a hint of remorse,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "burp"}],
[["ROCOUT-MultiMatch",35], EPD, {s:"+"}, DS, {s:"No one quite knew how to respond to the buddies of the janitors who, without a hint of remorse,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "burp"}],

[["ROCOUT-NoMatch",36], EPD, {s:"+"}, DS, {s:"At the summit, Ursula warmly greeted the advisor of the tycoon who, on every company outing,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "snowboard"}],
[["ROCOUT-LowMatch",36], EPD, {s:"+"}, DS, {s:"At the summit, Ursula warmly greeted the advisor of the tycoons who, on every company outing,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "snowboard"}],
[["ROCOUT-HighMatch",36], EPD, {s:"+"}, DS, {s:"At the summit, Ursula warmly greeted the advisors of the tycoon who, on every company outing,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "snowboard"}],
[["ROCOUT-MultiMatch",36], EPD, {s:"+"}, DS, {s:"At the summit, Ursula warmly greeted the advisors of the tycoons who, on every company outing,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "snowboard"}],

[["ROCOUT-NoMatch",37], EPD, {s:"+"}, DS, {s:"Vlad once again evaded the deputy of the sheriff who, after this final attempt,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "relent"}],
[["ROCOUT-LowMatch",37], EPD, {s:"+"}, DS, {s:"Vlad once again evaded the deputy of the sheriffs who, after this final attempt,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "relent"}],
[["ROCOUT-HighMatch",37], EPD, {s:"+"}, DS, {s:"Vlad once again evaded the deputies of the sheriff who, after this final attempt,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "relent"}],
[["ROCOUT-MultiMatch",37], EPD, {s:"+"}, DS, {s:"Vlad once again evaded the deputies of the sheriffs who, after this final attempt,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "relent"}],

[["ROCOUT-NoMatch",38], EPD, {s:"+"}, DS, {s:"The cunning Wally outmaneuvered the henchman of the villain who, with each new scheme,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "fail"}],
[["ROCOUT-LowMatch",38], EPD, {s:"+"}, DS, {s:"The cunning Wally outmaneuvered the henchman of the villains who, with each new scheme,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "fail"}],
[["ROCOUT-HighMatch",38], EPD, {s:"+"}, DS, {s:"The cunning Wally outmaneuvered the henchmen of the villain who, with each new scheme,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "fail"}],
[["ROCOUT-MultiMatch",38], EPD, {s:"+"}, DS, {s:"The cunning Wally outmaneuvered the henchmen of the villains who, with each new scheme,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "fail"}],

[["ROCOUT-NoMatch",39], EPD, {s:"+"}, DS, {s:"Xena was shocked by the publicist of the performer who, from the gallery window,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "appear"}],
[["ROCOUT-LowMatch",39], EPD, {s:"+"}, DS, {s:"Xena was shocked by the publicist of the performers who, from the gallery window,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "appear"}],
[["ROCOUT-HighMatch",39], EPD, {s:"+"}, DS, {s:"Xena was shocked by the publicists of the performer who, from the gallery window,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "appear"}],
[["ROCOUT-MultiMatch",39], EPD, {s:"+"}, DS, {s:"Xena was shocked by the publicists of the performers who, from the gallery window,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "appear"}],

[["ROCOUT-NoMatch",40], EPD, {s:"+"}, DS, {s:"You can be the penpal of the prisoner who, on fresh drafting paper,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "draw"}],
[["ROCOUT-LowMatch",40], EPD, {s:"+"}, DS, {s:"You can be the penpal of the prisoners who, on fresh drafting paper,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "draw"}],
[["ROCOUT-HighMatch",40], EPD, {s:"+"}, DS, {s:"You can be the penpals of the prisoner who, on fresh drafting paper,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "draw"}],
[["ROCOUT-MultiMatch",40], EPD, {s:"+"}, DS, {s:"You can be the penpals of the prisoners who, on fresh drafting paper,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "draw"}],
    
[["Filler-GoodFill",900], EPD, {s:"+"}, DS, {s:"For her daughter's birthday party, Alice hired a clown who, for a small fee,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "juggles"}],
[["Filler-BadFill",901], EPD, {s:"+"}, DS, {s:"During his speech at the high school, Brad called out the students who, on a daily basis,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "heckles"}],
[["Filler-GoodFill",902], EPD, {s:"+"}, DS, {s:"Because no one was dancing, Morris called up his friend who"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "spins"}],
[["Filler-BadFill",903], EPD, {s:"+"}, DS, {s:"During the airshow, General Griff intently watched the inexperienced pilots who, despite years of experience,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "crashes"}],
[["Filler-GoodFill",904], EPD, {s:"+"}, DS, {s:"Actually, we wouldn't usually hire any worker who"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "commutes"}],
[["Filler-BadFill",905], EPD, {s:"+"}, DS, {s:"We heard that Johnny simultaneously dated three girls who, regardless of their appearance,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "is"}],
[["Filler-GoodFill",906], EPD, {s:"+"}, DS, {s:"At the party, Mary Anne kept talking with the German visitor who, sometime last April,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-BadFill",907], EPD, {s:"+"}, DS, {s:"Ignoring my advice, Mrs. Dahlgren sought out the party hosts who, just this past week,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-GoodFill",908], EPD, {s:"+"}, DS, {s:"At the end of class, Professor Brown counseled the young student who, despite the good grade,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "cried"}],
[["Filler-BadFill",909], EPD, {s:"+"}, DS, {s:"At the comedy show, we tried to ignore the audience members who, thrice within an hour,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-GoodFill",910], EPD, {s:"+"}, DS, {s:"As a babysitter, Kelly should know how to handle the bratty kids who, even after a scolding,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "misbehave"}],
[["Filler-BadFill",911], EPD, {s:"+"}, DS, {s:"To my surprise, nobody knew that one guy over there who, only from the balcony,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "smoke"}],
[["Filler-GoodFill",912], EPD, {s:"+"}, DS, {s:"At the meeting, the boss wanted to know about the new commuters who, at least once a week,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "bike"}],
[["Filler-BadFill",913], EPD, {s:"+"}, DS, {s:"Actually my dog Loki will definitely bite any man who, despite the loud growling,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "walk"}],
[["Filler-GoodFill",914], EPD, {s:"+"}, DS, {s:"At our school, the Provost has no pity for the students who, forgetting previous warnings,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "plagiarize"}],
[["Filler-BadFill",915], EPD, {s:"+"}, DS, {s:"After the accident, that one nice cop consoled the bystander who, from behind the yellow tape,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-GoodFill",916], EPD, {s:"+"}, DS, {s:"I couldn't go home because my mother was with some old friends who, earlier in the day,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-BadFill",917], EPD, {s:"+"}, DS, {s:"Unfortunately, the young student teacher couldn't handle the kid who, likely during every lesson,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-GoodFill",918], EPD, {s:"+"}, DS, {s:"At the annual Veteran's Day parade, we all greeted the soldiers who, from the massive float,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-BadFill",919], EPD, {s:"+"}, DS, {s:"It was very difficult for John to console the victim who, at the scene of the crime,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-GoodFill",920], EPD, {s:"+"}, DS, {s:"Although there was an administrator at the rally, it was the students who, without any hesitation,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-GoodFill",921], EPD, {s:"+"}, DS, {s:"First the organizers honored the scientists, but the patient who, twice per painful operation"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-GoodFill",922], EPD, {s:"+"}, DS, {s:"The barking dog irritated Sal, but the cats who, just a minute ago,"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-BadFill",923], EPD, {s:"+"}, DS, {s:"Even though the quarterback apologized, everyone supported the players who"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-BadFill",924], EPD, {s:"+"}, DS, {s:"Tracy gave snacks to her kids, before she poured a beer for her sister who"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-BadFill",925], EPD, {s:"+"}, DS, {s:"The books that Quentin bought for his nephew"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-BadFill",926], EPD, {s:"+"}, DS, {s:"The DMV clerks who scared the teenager before his test"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-BadFill",927], EPD, {s:"+"}, DS, {s:"The sommelier who brought the wines over"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-BadFill",928], EPD, {s:"+"}, DS, {s:"The avocados seemed ripe, but the lemon"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-GoodFill",929], EPD, {s:"+"}, DS, {s:"The edition that the comic book fans couldn't find"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],

[["Filler-GoodFill",930], EPD, {s:"+"}, DS, {s:"I honestly can't remember if Kelly or her twin sister"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-GoodFill",931], EPD, {s:"+"}, DS, {s:"Either the brand new laptop or the aging desktop"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "is"}],
[["Filler-GoodFill",932], EPD, {s:"+"}, DS, {s:"The old duke and his young bride never"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "talk"}],
[["Filler-BadFill",933], EPD, {s:"+"}, DS, {s:"Jess couldn't believe it, but the little puppy and the mean old dachshund"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-BadFill",934], EPD, {s:"+"}, DS, {s:"Polly put out some milk for the cats because either Mr. Spots or the old tabby"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-BadFill",935], EPD, {s:"+"}, DS, {s:"On the bloody battlefield, King Leoric and the general"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-BadFill",936], EPD, {s:"+"}, DS, {s:"Thankfully, Gregory and his mother"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "knows"}],
[["Filler-BadFill",937], EPD, {s:"+"}, DS, {s:"All of a sudden the furious goalie and the referee"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "starts"}],
[["Filler-BadFill",938], EPD, {s:"+"}, DS, {s:"Only Suzy or the new girl at dance class"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "sing"}],
[["Filler-BadFill",939], EPD, {s:"+"}, DS, {s:"Only Howard, and not his younger brother"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "were"}],
[["Filler-GoodFill",940], EPD, {s:"+"}, DS, {s:"It was an unseasonably warm January day when Grant"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "tanned"}],
[["Filler-GoodFill",941], EPD, {s:"+"}, DS, {s:"Irma celebrated the new job by"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "buying"}],
[["Filler-GoodFill",942], EPD, {s:"+"}, DS, {s:"Because their parents had come down with the flu, the twins"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "behaved"}],
[["Filler-BadFill",943], EPD, {s:"+"}, DS, {s:"It is the most glamorous ball of the season and the princess"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "tease"}],
[["Filler-BadFill",944], EPD, {s:"+"}, DS, {s:"The whole sleep-over was in hysterics because Jane couldn't"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "stoping"}],
[["Filler-BadFill",945], EPD, {s:"+"}, DS, {s:"Right after the bake sale, Kevin and Lena"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "starts"}],
[["Filler-BadFill",946], EPD, {s:"+"}, DS, {s:"During the storm, Magdalena made fresh cookies and will"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "baking"}],
[["Filler-BadFill",947], EPD, {s:"+"}, DS, {s:"Old-fashioned as ever, Norbert will certainly"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "shaving"}],
[["Filler-BadFill",948], EPD, {s:"+"}, DS, {s:"Ophelia hated the fact that she couldn't be"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "help"}],
[["Filler-BadFill",949], EPD, {s:"+"}, DS, {s:"In the backyard, Perry and Phineas secretly"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "builds"}],
[["Filler-GoodFill",950], EPD, {s:"+"}, DS, {s:"Before testing the vintage lamp, Hector carefully"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "soldered"}],
[["Filler-BadFill",951], EPD, {s:"+"}, DS, {s:"The three friends from theatre class were finally able to"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "performed"}],
[["Filler-BadFill",952], EPD, {s:"+"}, DS, {s:"When the student left, their dutiful teacher"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "gather"}],
[["Filler-BadFill",953], EPD, {s:"+"}, DS, {s:"On the blocked highway, the officer and the volunteer"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "directs"}],
[["Filler-BadFill",954], EPD, {s:"+"}, DS, {s:"In the center of campus, the massive oak tree has been"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "grow"}],
[["Filler-GoodFill",955], EPD, {s:"+"}, DS, {s:"The controversial candidate wouldn't support each other by"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "providing"}],
[["Filler-BadFill",956], EPD, {s:"+"}, DS, {s:"Despite the large tip, Jeremiah irritated the waiter having"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "complain"}],
[["Filler-BadFill",957], EPD, {s:"+"}, DS, {s:"At the rally, Susan was disappointed that she couldn't"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "gathering"}],
[["Filler-GoodFill",958], EPD, {s:"+"}, DS, {s:"Vance heard his son yell from downstairs that the water"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "was"}],
[["Filler-GoodFill",959], EPD, {s:"+"}, DS, {s:"Wilma hid in the closet when she heard the vandal"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "break"}],
[["Filler-GoodFill",960], EPD, {s:"+"}, DS, {s:"Zane felt peaceful as he watched the waves wash up and"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "dissolve"}],

[["Filler-BadFill",961], EPD, {s:"+"}, DS, {s:"Everyone at the conference became annoyed at Arturo who"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "splintered"}],
[["Filler-BadFill",962], EPD, {s:"+"}, DS, {s:"After nearly a week, Brianna couldn't"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "radiate"}],
[["Filler-BadFill",963], EPD, {s:"+"}, DS, {s:"Carla was the kind of plumber who made sure her assistant"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "shattered"}],
[["Filler-BadFill",964], EPD, {s:"+"}, DS, {s:"Right as the surgeon entered the room, the nurses were about to"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "malfunction"}],
[["Filler-BadFill",965], EPD, {s:"+"}, DS, {s:"Even after trial, the defendant"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "oozed"}],
[["Filler-BadFill",966], EPD, {s:"+"}, DS, {s:"Dario knew that the car mechanics would"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "contain"}],
[["Filler-BadFill",967], EPD, {s:"+"}, DS, {s:"Because Ernestine and Francis might"}, "Separator",{ transfer: 100, normalMessage: "", errorMessage: ""}, QQ, {q: "crackle"}]
];
