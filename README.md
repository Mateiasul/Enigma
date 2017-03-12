# Enigma
![](https://github.com/pawKer/Enigma/blob/master/images/enigma2.jpg)
##Inspiration
Being our first ever app we wanted to combine many functionalities while still making something catchy and innovative.

##What it does
It is both a skill for Alexa that challenges you to recognize some of the world's most iconic places just by a (more or less) vague description and a text message game with the same functionality but which doesn't require and internet connection on the phone. The later was implemented through the Twilio API.

##How we built it
We have used a piece of open source code from Krishnaraj Varma (https://github.com/krvarma/Amazon-Echo-and-Twilio) that allowed us to send text messages via Alexa which we have then altered to allows us to start the game on the phone by sending a text message to the target client. We have extended the code further to implement the interactive version of the game so you Alexa can ask you questions and you can respond.

##Challenges we ran into
Being new to Alexa and especially JavaScript it was difficult at first to make sense of the code and understand it well enough so we can model it to our advantage. Also debugging on AWS was a bit of a pain.

##Accomplishments that we're proud of
We are definitely proud of what we managed to achieve in such a short timeframe given the fact that none of us had done this before.

##What we learned
I would say we all learned a great deal not only about JavaScript, Python and how they use libraries to implement awesome functionalities but also about development on AWS.

##What's next for Enigma
Enigma 2.0 should find better strategies of implementing the question/answer part using maybe a decision tree structure , maybe make it work for many clients and add many different questions about different locations around the world while still keeping the informative aspect.

##How to make it work?
You will need to import the Twilio API, host the source files as a zip on AWS and link it with Alexa Developer Console using the settings provided in speechAssets(IntentSchema, SampleUtterances).

Also, to make the receiving of the messages be handled you need to start a ngrok(which you mind need to download) to set up a http server on port 5000 and then link that to your Twilio Number.Note: you also need a Twilio account.

**For additional help**
you can follow the instruction in Krishnaraj's project above.
