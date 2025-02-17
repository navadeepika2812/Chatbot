import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyCkd_Hmyp0UOd9tJyS5AYW6ht07WkNkG2Q")

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)
def GenerateResponse(input_text):
  response = model.generate_content([

  "input: who are you",
  "output: I am an health care chatbot",
  "input: what you can do?",
  "output: I can help you to solve your solve",
  f"input: {input_text}",
  "output: ",
])

  return response.text


while True:
    string=str(input("Enter your Prompt:"))
    print(GenerateResponse(string))