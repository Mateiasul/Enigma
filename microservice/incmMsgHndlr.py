from flask import Flask, request
from twilio import twiml


app = Flask(__name__)
ok = 0
triesLeft = 3
city = 0


@app.route('/sms', methods=['POST'])
def sms():
    global ok
    global triesLeft
    global city
    number = request.form['From']
    message_body = request.form['Body']
    message_body = message_body.lower()

    question1 = "You will need to answer 4 related questions! First question: "
    question1 += "You are standing in a place which was formally called "
    question1 += "Longacre Square, and that is also known as The Crossroads "
    question1 += "of the world. What is the name of this place?"

    question2 = "You are standing in front of a colossal sculpture that "
    question2 += "holds a torch in its right hand. What is its name?"

    question3 = "You are watching a Knicks home game in an amazing stadium. "
    question3 += "What is the name of the stadium?"

    question4 = "You decided to take a walk in one of the 10 greatest parks "
    question4 += "in the world. What is the name of this park?"

    questionp1 = "You will need to answer 4 related questions! "
    questionp1 += "First question: During WW2, when Hitler visited Paris, "
    questionp1 += "the French cut the lift cables on this monument so that "
    questionp1 += "Hitler would have to climb the steps if he wanted to reach "
    questionp1 += "the top. What is this significant monument?"

    questionp2 = "Paris beat Barcelona 4-0 in their 2017 Champions League "
    questionp2 += "home game in this stadium. What is it called?"

    questionp3 = "The ashes of Joan of Arc were scattered here and this "
    questionp3 += "river was the inspiration for lots of Impressionist "
    questionp3 += "painters, such as Henri Matisse. "
    questionp3 += "What is the name of this river?"

    questionp4 = "What is the name of the biggest museum in the world, so "
    questionp4 += "big that it is impossible to visit in only one day?"

    bravo = "Well done, you advanced to the next level! "
    bravo += "Now, to the next question: "

    lose = "Sorry, you lost!"
    win = "Congratulations! You win!"
    mistakeMsg = "Incorrect answer. "

    if ((triesLeft - 1) <= 0):
        text = lose
    elif ((triesLeft - 1) > 1):
        mistakeMsg += "You are still allowed to make " + str(triesLeft - 1)
        mistakeMsg += " more mistakes"
    elif ((triesLeft - 1) == 1):
        mistakeMsg += "You are still allowed to make one more mistake"
    mistakeMsg += "! Try again!"

    if (ok == 0 and city == 0):
        if (message_body == "new york"):
            city = 1
            text = question1
        elif (message_body == "paris"):
            city = 2
            text = questionp1
        else:
            text = "This one will be added soon, meanwhile, "
            text += "think of a different city."
            ok -= 1

    if (city == 1):
        if (ok == 1):
            if ((message_body == "times square" or
                 message_body == "time square")):
                text = question2
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1
        elif (ok == 2):
            if ((message_body == "statue of liberty" or
                 message_body == "the statue of liberty")):
                text = bravo + question3
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1
        elif (ok == 3):
            if (message_body == "madison square garden"):
                text = bravo + question4
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1
        elif (ok == 4):
            if (message_body == "central park"):
                text = win
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1

    if (city == 2):
        if (ok == 1):
            if ((message_body == "eiffel tower" or
                 message_body == "the eiffel tower")):
                text = bravo + questionp2
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1
        elif (ok == 2):
            if ((message_body == "stade de france" or
                 message_body == "stadium of france")):
                text = bravo + questionp3
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1
        elif (ok == 3):
            if ((message_body == "the seine" or message_body == "seine" or
                 message_body == "seine river" or
                 message_body == "river seine")):
                text = bravo + questionp4
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1
        elif (ok == 4):
            if (message_body == "the louvre" or message_body == "louvre"):
                text = win
            else:
                triesLeft -= 1
                text = mistakeMsg
                ok -= 1

    ok += 1

    resp = twiml.Response()
    resp.message(text)
    return str(resp)


if __name__ == '__main__':
    app.run()
