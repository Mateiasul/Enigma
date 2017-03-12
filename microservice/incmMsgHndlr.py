from flask import Flask, request
from twilio import twiml
 
 
app = Flask(__name__)
ok = 0
mistakes = 0
@app.route('/sms', methods=['POST'])
def sms():
    global ok
    global mistakes
    number = request.form['From']
    message_body = request.form['Body']
    message_body = message_body.lower()

    question1 = """You will need to answer 4 related questions! First question: 
                    You are standing in a place which was formally called Longacre Square,
                    and that is also known as The Crossroads of the world. What is the name of this place?"""
    question2 = "You are standing in front of the grand thing that holds a torch in its right hand. Can u guess its name?"
    question3 = "You are watching a home Knicks game in an amazing stadium. Can u guess the name of this place?"
    question4 = "You decided to take a walk in one of the 10th greatest parks in the world. Can u guess the name of this park?"
    bravo = "Well done, you advanced to the next level!\n"
    mistakeMsg = ""
    if (mistakes == 2):
    	mistakeMsg = "Incorrect answer. One more mistake and you lose! Try again!"
    else:
    	mistakeMsg = "Incorrect answer. You are still allowed to make " + str(2 - mistakes) + " more mistakes! Try again!"
    lose = "Congratulations! You win!"
    win = "You win!"

    
    if (ok == 0):
      if (message_body == "play"):
    	  text = "Think of a city."
      else:
    	  text = "Invalid request!"
    	  ok = -1

    if (ok == 1):
      if (message_body == "new york"):
        text = question1
      else:
      	text = "This one will be added soon, meanwhile, think of a different city."
      	ok -= 1

    if (ok == 2):
      if (message_body == "times square"):
        text = bravo + question2
      else:
        text = mistakeMsg
        mistakes += 1
        ok -= 1

    if (ok == 3):
      if (message_body == "statue of liberty"):
        text = bravo + question3
      else:
        text = mistakeMsg
      	mistakes += 1
        ok -= 1

    if (ok == 4):
      if (message_body == "madison square garden"):
        text = bravo + question4
      else:
        text = mistakeMsg
      	mistakes += 1
        ok -= 1

    if (ok == 5):
      if (message_body == "central park"):
        text = bravo + win
      else:
        text = mistakeMsg
      	mistakes += 1
        ok -= 1

    if (mistakes == 4):
      text = lose
      ok = -1
      mistakes = 0

    ok += 1

    resp = twiml.Response()
    resp.message(text)
    return str(resp)

if __name__ == '__main__':
    app.run()