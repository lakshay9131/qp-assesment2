import * as fs from 'fs';
import * as path from 'path';

const QUESTION_FILE = path.resolve(__dirname, 'questions.json');


// interface
export interface Question {
    question: string;
    subject: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    marks: number;
  }

export class QuestionStore {
    private questions: Question[] = [];
  
    constructor() {
      this.loadQuestions();
    }
  
    addQuestion(question: Question): void {
      this.questions.push(question);
      this.saveQuestions();
    }
  
    getQuestions(): Question[] {
      return this.questions;
    }
  
    private loadQuestions(): void {

      console.log("reading..",fs.existsSync(QUESTION_FILE));
      if (fs.existsSync(QUESTION_FILE)) {
        const data = fs.readFileSync(QUESTION_FILE, 'utf-8');
        this.questions = JSON.parse(data) as Question[];
      }
    }
  
    private saveQuestions(): void {
      fs.writeFileSync(QUESTION_FILE, JSON.stringify(this.questions, null, 2));
    }
  }