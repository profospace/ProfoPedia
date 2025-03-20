import React, { useState } from 'react';
import { Upload, FileText, Check, Download, AlertCircle } from 'lucide-react';

const VillageCodeConverter = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState([]);

  // Process file when uploaded
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');
    setResult(null);
    setPreview([]);

    // Read the file
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setLoading(true);
        const fileContent = event.target.result;

        // Process the file content
        const processedResult = processVillageCodeFile(fileContent);
        setResult(processedResult);

        // Set preview of 10 entries
        try {
          const entries = JSON.parse(processedResult.json);
          setPreview(entries.slice(0, 10));
        } catch (err) {
          console.error('Error parsing JSON preview:', err);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error processing file:', err);
        setError('An error occurred while processing the file. Please ensure it is in the correct format.');
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
      setLoading(false);
    };

    reader.readAsText(selectedFile);
  };

  // Download the JSON result as a file
  const downloadJson = () => {
    if (!result) return;

    const blob = new Blob([result.json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `village-codes-sro-${result.sroCode}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Village Code Converter</h1>
        <p className="text-gray-600">
          Upload a village code CSV file to convert it to JSON with English transliterations
        </p>
      </div>

      {/* File Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.csv"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="w-12 h-12 mb-3 text-gray-400" />
            <span className="text-lg font-medium text-gray-700">
              {file ? file.name : 'Click to upload a file'}
            </span>
            <span className="text-sm text-gray-500 mt-1">
              Supported formats: .txt, .csv (UTF-8 encoded)
            </span>
          </label>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Processing file...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && !loading && (
        <div className="mt-12 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Conversion Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500">Tehsil</span>
                <p className="font-medium">{result.tehsil}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500">SRO Code</span>
                <p className="font-medium">{result.sroCode}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-500">Total Entries</span>
                <p className="font-medium">{result.entriesCount.toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={downloadJson}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </button>
          </div>

          {/* Preview Section */}
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Preview (First 10 entries)</h3>
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hindi Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">English Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {preview.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{entry.value}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{entry.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{entry.nameEn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Converter Function - Hidden from UI but used by the app */}
      <div className="hidden">
        {/* 
          The village code converter functions are included in the component
          to make it self-contained. In a real app, these would typically be 
          imported from a separate module.
        */}
      </div>
    </div>
  );
};

// Village Code Converter functions
function processVillageCodeFile(fileContent) {
  const result = convertVillageCodesTojson(fileContent);
  const jsonOutput = generateJson(result);
  return {
    tehsil: result.tehsil,
    sroCode: result.sroCode,
    entriesCount: result.entries.length,
    json: jsonOutput
  };
}

function convertVillageCodesTojson(csvContent) {
  const lines = csvContent.split('\n');

  let tehsilInfo = '';
  let sroCode = '';
  let startProcessing = false;
  const entries = [];

  for (const line of lines) {
    if (line.startsWith('Tehsil/SRO office')) {
      tehsilInfo = line.split('-')[1].trim();
      continue;
    }

    if (line.startsWith('sroCode')) {
      sroCode = line.split('-')[1].trim();
      continue;
    }

    if (line.startsWith('value,name')) {
      startProcessing = true;
      continue;
    }

    if (startProcessing && line.trim() && !line.startsWith('-1,-select--')) {
      const parts = line.split(',');
      if (parts.length >= 2) {
        const value = parts[0].trim();
        const name = parts[1].trim();

        if (value && name && value !== '-1' && name !== '-select--') {
          let nameEn = transliterate(name);
          nameEn = improveTransliteration(nameEn);
          entries.push({ value, name, nameEn });
        }
      }
    }
  }

  return {
    tehsil: tehsilInfo,
    sroCode,
    entries
  };
}

function transliterate(text) {
  const consonants = {
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
    'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
    'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh',
    'ष': 'sh', 'स': 's', 'ह': 'h'
  };

  const vowels = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u',
    'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'ऋ': 'ri'
  };

  const vowelMarks = {
    'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
    'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ृ': 'ri',
    'ं': 'n', 'ः': 'h', 'ँ': 'n', '्': ''
  };

  const specials = {
    'क्ष': 'ksh', 'त्र': 'tr', 'ज्ञ': 'gya',
    'ड़': 'r', 'ढ़': 'rh', '़': '',
    'ॉ': 'o', '‍': '', '‌': '', '॰': '',
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
  };

  // Replace specials
  for (const [char, trans] of Object.entries(specials)) {
    text = text.split(char).join(trans);
  }

  // Process character by character
  let result = '';
  let i = 0;

  while (i < text.length) {
    // Check for conjuncts
    let foundConjunct = false;
    for (const [conj, trans] of Object.entries(specials)) {
      if (conj.length > 1 && i + conj.length <= text.length && text.substring(i, i + conj.length) === conj) {
        result += trans;
        i += conj.length;
        foundConjunct = true;
        break;
      }
    }
    if (foundConjunct) continue;

    // Check for vowels
    if (vowels[text[i]]) {
      result += vowels[text[i]];
      i++;
      continue;
    }

    // Check for consonants
    if (consonants[text[i]]) {
      result += consonants[text[i]];

      if (i + 1 < text.length && vowelMarks[text[i + 1]]) {
        result += vowelMarks[text[i + 1]];
        i += 2;
      } else if (i + 1 < text.length && text[i + 1] === '्') {
        i += 2;
      } else {
        if (!(i + 2 < text.length && consonants[text[i + 1]] && text[i + 2] === '्')) {
          result += 'a';
        }
        i++;
      }
      continue;
    }

    // Check for vowel markers 
    if (vowelMarks[text[i]]) {
      result += vowelMarks[text[i]];
      i++;
      continue;
    }

    // If nothing matches, add the character
    result += text[i];
    i++;
  }

  // Capitalize first letter of each word
  return result.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function improveTransliteration(text) {
  // Basic pattern corrections
  let improved = text
    .replace(/Nagra/g, 'Nagar')
    .replace(/Pura$/g, 'Pur')
    .replace(/Purama$/g, 'Puram')
    .replace(/Cahka/g, 'Chak')
    .replace(/Gnja/g, 'Ganj');

  // Common name improvements
  const improvements = {
    'Akabarapura': 'Akbarpur',
    'Shahapura': 'Shahpur',
    'Gaonga': 'Gang',
    'Beelahaura': 'Bilhaur',
    'Chaka': 'Chak',
    'Kurmee': 'Kurmi',
    'Kuralee': 'Kurali',
    'Ganva': 'Ganw',
    'Kalaana': 'Kalan',
    'Khurda': 'Khurd',
    'Baruva': 'Baruwa',
    'Shaivarajapura': 'Shivrajpur',
    'Bajuga': 'Buzurg',
    'Katree': 'Katri',
    'Nasairapura': 'Nasirpur',
    'Raajepura': 'Rajepur',
    'Aneee': 'Anei',
    'Auranga': 'Aurang',
    'Kalaan': 'Kalan',
    'Aajada': 'Azad',
    'Ajaulee': 'Ajauli',
    'Atava': 'Atwa',
    'Joohi': 'Juhi'
  };

  // Apply improvements
  for (const [original, better] of Object.entries(improvements)) {
    improved = improved.replace(new RegExp(original, 'gi'), better);
  }

  return improved;
}

function generateJson(data) {
  return JSON.stringify(data.entries, null, 2);
}

export default VillageCodeConverter;