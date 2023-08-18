import pyttsx3
import sys
import os

# Grab system cmd arguments
text = sys.argv[1]
index = sys.argv[2]

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Set the speech rate (adjust this value as needed)
engine.setProperty('rate', 135)  # You can experiment with different values

# Specify the path to the audio directory
script_directory = os.path.dirname(os.path.abspath(__file__))
audio_directory = os.path.join(script_directory, "..", "audio")

# Create the directory if it doesn't exist
if not os.path.exists(audio_directory):
    os.makedirs(audio_directory)

# Generate speech using the default voice
output_file_path = os.path.join(audio_directory, f"{index}.mp3")
engine.save_to_file(text, output_file_path)
engine.runAndWait()
