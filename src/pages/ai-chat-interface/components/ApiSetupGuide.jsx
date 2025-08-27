import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ApiSetupGuide = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Get Your API Key",
      content: (
        <div className="space-y-4">
          <p>To enable full AI capabilities, you need a Gemini API key:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Visit <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google AI Studio</a></li>
            <li>Sign in with your Google account</li>
            <li>Click "Get API Key" or "Create API Key"</li>
            <li>Copy the generated key (starts with "AIza...")</li>
          </ol>
        </div>
      )
    },
    {
      title: "Configure Your Key",
      content: (
        <div className="space-y-4">
          <p>Update your environment configuration:</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm font-mono">
              VITE_GEMINI_API_KEY=AIzaSyYourActualApiKeyHere...
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Replace the demo key in your .env file with your actual API key</p>
            <p className="mt-2">⚠️ Make sure there are no quotes or spaces around the key</p>
          </div>
        </div>
      )
    },
    {
      title: "Restart & Test",
      content: (
        <div className="space-y-4">
          <p>Final steps to activate AI features:</p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Save the .env file (the server will automatically restart)</li>
            <li>Refresh this page</li>
            <li>Click "Run API Diagnostic" to test your setup</li>
            <li>Start chatting with full AI capabilities!</li>
          </ol>
          <div className="bg-green-50 p-3 rounded-md">
            <p className="text-sm text-green-700">
              ✅ Once configured, you'll get real AI-powered career advice from Google's Gemini!
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Setup Gemini AI ({step}/3)
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-3">{steps[step - 1].title}</h4>
          {steps[step - 1].content}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index + 1 <= step ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            {step > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            {step < steps.length ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => setStep(step + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={onClose}
              >
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSetupGuide;
