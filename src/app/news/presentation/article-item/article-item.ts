import {Component, inject, input} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Article} from '../../domain/model/article.entity';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-article-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatButton,
    MatCardImage,
    MatIconButton,
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './article-item.html',
  styleUrl: './article-item.css'
})
export class ArticleItem {
  private snackBar = inject(MatSnackBar);
  article = input.required<Article>();

  async shareArticle() {
    const articleShareInfo = {
      title: this.article()?.title,
      url: this.article()?.url
    };

    if (navigator.share) {
      try {
        await navigator.share(articleShareInfo);
        this.snackBar.open('Article shared successfully!', 'Close', { duration: 3000 });
      } catch (error) {
        this.snackBar.open('Sharing failed.', 'Close', { duration: 3000 });
      }
    } else {
      try {
        if (articleShareInfo.url) {
          await navigator.clipboard.writeText(articleShareInfo.url);
          this.snackBar.open('Article URL copied to clipboard!', 'Close', { duration: 3000 });
        }
      } catch (error) {
        this.snackBar.open('Failed to copy URL.', 'Close', { duration: 3000 });
      }
    }
  }
}
