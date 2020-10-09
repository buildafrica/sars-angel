"use strict";
/**
 * Define the content for message body to be used in all events
 * @name Body Body content to use through Angel
 * @param sms Short form of message to blast through sms
 * @param twitter Twitter short form tweet with hashtag
 * @param voice Text to use in TTS for Automated Voice Call
 * @param whatsapp Short form of message to blast through WhatsApp Client
 * @param email A HTMl String tag to append into the body of email blast
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentions = exports.alt = void 0;
exports.default = {
    sms: 'Leaders establish trust with candor transparency and credit',
    twitter: 'Leaders establish trust with candor transparency and credit #EndSARS',
    voice: 'Leaders establish trust with candor transparency and credit',
    whatsapp: 'Leaders establish trust with candor transparency and credit',
    email: 'Dear sir/ma, I am  a concerned citizen of your constituent, and I will like to express my displeasure about SARS. The members of this squad who are supposed to protect us against armed robbery are killing, extorting and harassing us everyday. We are scared to move freely and we need your help. I urge you, distinguished, to use your office to protect the lives of Nigerian youths as we are the future of the Nation. We are counting on you to do the right thing. We are counting on you to help us #ENDSARS. Thanks!'
};
exports.alt = {
    email: 'Leaders establish trust with candor transparency and credit, A leader is best when people barely know he exists when his work is done, his aim fulfilled, they will all say: We did it ourselves'
};
/* For Tweets */
exports.mentions = '@BBCNews  @cnnbrk  @dwtv  @TheDailyShow  @FoxNews  @FOXTV  @FOX17Erik  @FoxBusiness  @FoxNews  @espn  @ESPNPR  @ABC   @AriseTVAmerica  @nytimes  @NYDailyNews  @nypost  @AlJazeera  @AljazeeraDoc  @cnnbrk  @bbcquestiontime   @cnni';
