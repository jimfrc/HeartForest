import { Card } from "../types";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

export async function generateNewCard(topic: string): Promise<Card> {
  console.log('DeepSeek API Key:', DEEPSEEK_API_KEY ? 'Set' : 'Not set');
  console.log('Generating card for topic:', topic);
  
  try {
    const requestBody = {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates JSON responses for a couples' interactive card game. Please respond with only valid JSON in the specified format."
        },
        {
          role: "user",
          content: `请为情侣互动卡牌游戏"心语森林"生成一张新的卡牌。
主题是：${topic}。
卡牌需要包含：
1. 类别：'deep-talk' (深度对话) 或 'challenge' (互动挑战)。
2. 标题：如果是对话则为'心语时刻'，如果是挑战则为'森林挑战'。
3. 内容：一段温馨、治愈、能促进情感连接的文字，字数严格控制在50字以内，非常简洁，不要超过50字。
4. 动物：一个代表该卡牌性格的动物名称（英文，如 Koala, Rabbit, Fox, Lion, Owl）。
5. 颜色：一个Tailwind CSS背景色类名（如 bg-rose-50, bg-emerald-50, bg-amber-50）。

请以JSON格式返回，包含以下字段：category, title, content, animal, color。不要包含其他任何文本。`
        }
      ],
      stream: false
    };
    
    console.log('API Request:', {
      url: DEEPSEEK_API_URL,
      body: requestBody
    });
    
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('API Response Status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Invalid response format from DeepSeek API');
    }
    
    const content = data.choices[0].message.content;
    console.log('Response Content:', content);
    
    let cardData;
    try {
      // 处理API返回的JSON被包裹在代码块标记中的情况
      let jsonContent = content;
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace('```json', '').replace('```', '').trim();
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace('```', '').replace('```', '').trim();
      }
      cardData = JSON.parse(jsonContent);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Failed to parse JSON response');
    }
    
    console.log('Parsed Card Data:', cardData);
    
    // 验证必填字段
    const requiredFields = ['category', 'title', 'content', 'animal', 'color'];
    for (const field of requiredFields) {
      if (!cardData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // 验证category
    const validCategories: Array<'deep-talk' | 'challenge' | 'wisdom'> = ['deep-talk', 'challenge', 'wisdom'];
    if (!validCategories.includes(cardData.category as any)) {
      throw new Error(`Invalid category: ${cardData.category}`);
    }
    
    // 验证内容字数
    if (cardData.content.length > 80) {
      // 截断内容到80字
      cardData.content = cardData.content.substring(0, 80) + '...';
      console.log('Content truncated to 80 characters:', cardData.content);
    }
    
    return {
      id: Math.random().toString(36).substring(2, 11),
      category: cardData.category as 'deep-talk' | 'challenge' | 'wisdom',
      title: cardData.title,
      content: cardData.content,
      animal: cardData.animal,
      color: cardData.color
    };
  } catch (error) {
    console.error('Error generating card:', error);
    throw error;
  }
}

export async function generateCardImage(card: Card): Promise<string> {
  // 使用本地已有的动物卡牌图像
  const animalImages: Record<string, string> = {
    'Koala': '../source/兔子卡牌.png',
    'Rabbit': '../source/兔子卡牌.png',
    'Fox': '../source/狐狸卡牌.png',
    'Lion': '../source/狮子卡牌.png',
    'Owl': '../source/牛卡牌.png',
    'Dog': '../source/狗卡牌.png',
    'Cat': '../source/猫卡牌.png',
    'Monkey': '../source/猴子卡牌.png',
    'Sheep': '../source/羊卡牌.png',
    'Tiger': '../source/老虎卡牌.png',
    'Mouse': '../source/老鼠卡牌.png',
    'Snake': '../source/蛇卡牌.png',
    'Pig': '../source/野猪卡牌.png',
    'Horse': '../source/马卡牌.png',
    'Chicken': '../source/鸡卡牌.png',
    'Dragon': '../source/龙卡牌.png'
  };
  
  // 根据卡牌的动物类型返回对应的本地图像路径
  return animalImages[card.animal] || '../source/兔子卡牌.png';
}
