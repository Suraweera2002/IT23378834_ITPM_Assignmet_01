const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Updated counts: 25 positive, 10 negative
const TEST_DATA = {
  positive: [
    {
      tcId: 'Pos_Fun_0001',
      name: 'Simple mixed-language greeting',
      input: 'ayubowan! mama lankawe innava, thank you',
      expected: 'අයුබෝවන්! මම ලංකාවේ ඉන්නවා, thank you',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Office context casual request',
      input: 'mama office ekata yanna oone, meeting ekak tiyenava',
      expected: 'මම office එකට යන්න ඕනේ, meeting එකක් තියෙනවා',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0003',
      name: 'Question with mixed pronouns',
      input: 'kohomada oyage project eka? deadline eka kada giyada?',
      expected: 'කොහොමද ඔයාගේ project එක? deadline එක කද ගියද?',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0004',
      name: 'Food ordering scenario',
      input: 'api dennama burger ekak gannawa, fries ekath genna. delivery kada yawida kiyala call karanna',
      expected: 'අපි දෙන්නම burger එකක් ගන්නවා, fries එකත් ගෙන්න. delivery කද යවීද කියල call කරන්න',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0005',
      name: 'Technology discussion',
      input: 'magee laptop eke battery life hodai. mama daily 8 hours wada karanna puluwan charge ekak gahala',
      expected: 'මගේ laptop එකේ battery life හොඳයි. මම daily 8 hours වැඩ කරන්න පුළුවන් charge එකක් ගැහලා',
      category: 'Mixed Singlish + English',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0006',
      name: 'Social media context',
      input: 'mama Facebook page eke post ekak damma. like gahanna',
      expected: 'මම Facebook page එකේ post එකක් දැම්ම. like ගහන්න',
      category: 'Names / places / common English words',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0007',
      name: 'Shopping scenario',
      input: 'mama supermarket ekata gihilla milk, bread saha butter gatta. total bill eka Rs. 1500 yi',
      expected: 'මම supermarket එකට ගිහිල්ලා milk, bread සහ butter ගත්ත. total bill එක Rs. 1500 යි',
      category: 'Daily language usage',
      grammar: 'Past tense',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0008',
      name: 'Travel planning',
      input: 'apita December maase travel plan ekak tiyenava. api Kandy, Ella saha Galle yanava. mama online ekak hotel booking kala. train tickets ganna oone',
      expected: 'අපිට December මාසේ travel plan එකක් තියෙනවා. අපි Kandy, Ella සහ Galle යනවා. මම online එකෙන් hotel booking කළා. train tickets ගන්න ඕනේ',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'L'
    },
    {
      tcId: 'Pos_Fun_0009',
      name: 'Weather conversation',
      input: 'ada weather eka barai ne? mama rain coat ekak aragena yanna ona',
      expected: 'අද weather එක බැරයි නේ? මම rain coat එකක් අරගෙන යන්න ඕන',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0010',
      name: 'Educational context',
      input: 'mama exam ekata prepare venava. textbook eke chapter 5 saha 6 study karanna ona. online resources tikath balanna',
      expected: 'මම exam එකට prepare වෙනවා. textbook එකේ chapter 5 සහ 6 study කරන්න ඕන. online resources ටිකත් බලන්න',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0011',
      name: 'Currency symbol placement',
      input: 'ee item eke price eka $50 yi. discount ekak tibuna nam gannawa',
      expected: 'ඒ item එකේ price එක $50 යි. discount එකක් තිබුණ නම් ගන්නවා',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0012',
      name: 'Time format conversation',
      input: 'meeting eka 2:30 PM ta schedule kalaa. on time enna',
      expected: 'meeting එක 2:30 PM ට schedule කළා. on time එන්න',
      category: 'Punctuation / numbers',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0013',
      name: 'Percentage with decimal',
      input: 'bank interest rate eka 8.5% ta wadi wela. good news',
      expected: 'bank interest rate එක 8.5% ට වැඩි වෙලා. good news',
      category: 'Punctuation / numbers',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0014',
      name: 'Version number in text',
      input: 'mama software v2.5.1 install kala. latest version eka nam v3.0 yi',
      expected: 'මම software v2.5.1 install කළා. latest version එක නම් v3.0 යි',
      category: 'Punctuation / numbers',
      grammar: 'Past tense',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0015',
      name: 'Simple present tense statement',
      input: 'mama iskoolee inna',
      expected: 'මම ඉස්කෝලේ ඉන්න',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0016',
      name: 'Simple food request',
      input: 'mata kiri oonee',
      expected: 'මට කිරි ඕනෑ',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0017',
      name: 'Going home statement',
      input: 'api gedhara yanavaa',
      expected: 'අපි ගෙදර යනවා',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0018',
      name: 'Two activities connected',
      input: 'mama kaeema kannam saha passe naaginnam',
      expected: 'මම කෑම කන්නම් සහ පස්සේ නාගින්නම්',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0019',
      name: 'Weather condition compound',
      input: 'vaessa yanavanam api yannee naee',
      expected: 'වැස්ස යනවනම් අපි යන්නේ නෑ',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0020',
      name: 'Conditional complex sentence',
      input: 'oyaa enavaanam mama innaanam kaeema laeesthi karannam',
      expected: 'ඔයා එනවානම් මම ඉන්නානම් කෑම ලෑස්ති කරන්නම්',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0021',
      name: 'Simple question about state',
      input: 'oyaa kohedha innee',
      expected: 'ඔයා කොහෙද ඉන්නේ',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0022',
      name: 'Question about time',
      input: 'kavaddha enna yanne',
      expected: 'කවද්ද එන්න යන්නේ',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0023',
      name: 'Direct command',
      input: 'laBa enna',
      expected: 'ලඟ එන්න',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0024',
      name: 'Polite command',
      input: 'karuNaakaralaa poddak thissee balanna',
      expected: 'කරුණාකරලා පොඩ්ඩක් තිස්සේ බලන්න',
      category: 'Greeting / request / response',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0025',
      name: 'Morning greeting',
      input: 'suba udhaeesanak',
      expected: 'සුබ උදෑසනක්',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    }
  ],
  
  negative: [
    {
      tcId: 'Neg_Fun_0001',
      name: 'Ambiguous spelling variation',
      input: 'mama okkoma weda karala iwara kala',
      expected: 'මම ඔක්කොම වැඩ කරලා ඉවර කළා',
      category: 'Typographical error handling',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0002',
      name: 'Brand name case sensitivity',
      input: 'mama iPhone saha MacBook use karanava daily',
      expected: 'මම iPhone සහ MacBook use කරනවා daily',
      category: 'Names / places / common English words',
      grammar: 'Present tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0003',
      name: 'Numeric confusion with text',
      input: 'mama 100% confirm, we3ema tikak karanna puluwan',
      expected: 'මම 100% confirm, වැඩෙම ටිකක් කරන්න පුළුවන්',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0004',
      name: 'Incomplete word conversion',
      input: 'kaw ruuda yanwa? mama wait kara wait kara hitiynne',
      expected: 'කව් රූද යන්ව? මම wait කර wait කර හිටියන්නේ',
      category: 'Typographical error handling',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0005',
      name: 'Mixed script URL handling',
      input: 'mama www.sinhala.lk site eke article ekak kiyawwa. very good content',
      expected: 'මම www.sinhala.lk site එකේ article එකක් කියව්වා. very good content',
      category: 'Names / places / common English words',
      grammar: 'Past tense',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0006',
      name: 'Email address in text',
      input: 'magee email eka nimal@gmail.com kiyala denna',
      expected: 'මගේ email එක nimal@gmail.com කියල දෙන්න',
      category: 'Names / places / common English words',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0007',
      name: 'Hashtag conversion error',
      input: 'mama #SriLanka #TravelGoals dagala post ekak damma',
      expected: 'මම #SriLanka #TravelGoals දාගල post එකක් දැම්ම',
      category: 'Punctuation / numbers',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0008',
      name: 'Phone number format error',
      input: 'magee phone number eka 0771234567, call karanna',
      expected: 'මගේ phone number එක 0771234567, call කරන්න',
      category: 'Punctuation / numbers',
      grammar: 'Imperative (command)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0009',
      name: 'Code snippet in conversation',
      input: 'mama code eke if (x > 5) kiyala damma. syntax error ekak enava',
      expected: 'මම code එකේ if (x > 5) කියල දැම්ම. syntax error එකක් එනවා',
      category: 'Mixed Singlish + English',
      grammar: 'Past tense',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0010',
      name: 'Mixed case acronym error',
      input: 'API eka use karala data fetch karanna. JSON format eke response ekak enava',
      expected: 'API එක use කරල data fetch කරන්න. JSON format එකේ response එකක් එනවා',
      category: 'Names / places / common English words',
      grammar: 'Imperative (command)',
      length: 'S'
    }
  ],
  
  ui: {
    tcId: 'Pos_UI_001',
    name: 'Real-time translation updates as typing',
    input: 'mama kaeema kannavaa',
    partialInput: 'mama kae',
    expectedFull: 'මම කෑම කන්නවා',
    category: 'Usability flow',
    grammar: 'Present tense',
    length: 'S'
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});

module.exports = { TEST_DATA, CONFIG, TranslatorPage };
