import inquirer from "inquirer";
import path from "path";
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module 中获取 __dirname 的方法
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface IAnswer {
  projectName: string;
  continue: boolean;
}

export async function cli(): Promise<void> {
  // 1.询问用户输入
  const answers = await inquirer.prompt<IAnswer>([
    {
      type: "input",
      name: "projectName",
      message: "请输入项目名称",
      default: 'my-hapi-app'
    },
    {
      type: "confirm",
      name: 'continue',
      message: '是否在当前目录创建',
      default: true
    }
  ]);
  const targetDir = path.join(process.cwd(), answers.projectName);
  // 检查目录是否存在
  if (await fs.pathExists(targetDir)) {
    console.log(`目录 ${answers.projectName} 已存在`)
    return;
  }
  // 复制模版
  console.log('🚀 正在创建项目...');
  const templateDir = path.join(__dirname, '../template');
  await fs.copy(templateDir, targetDir);

  console.log(`✅ 项目 ${answers.projectName} 创建成功!`);
  console.log(`\n接下来请执行:`);
  console.log(`  cd ${answers.projectName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
}