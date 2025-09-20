import {Component, inject, OnInit} from '@angular/core';
import {NewsStore} from '../../../news/application/news.store';
import {Source} from '../../../news/domain/model/source.entity';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {SourceList} from '../../../news/presentation/source-list/source-list';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {ArticleList} from '../../../news/presentation/article-list/article-list';
import {Footer} from '../footer/footer';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    SourceList,
    MatSidenavContent,
    MatIconButton,
    MatIcon,
    LanguageSwitcher,
    ArticleList,
    Footer
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit {
  protected store = inject(NewsStore);
  protected readonly sources = this.store.sources;
  protected readonly articles = this.store.currentSourceArticles;


  ngOnInit(): void {
    this.store.loadSources();
    this.store.loadArticlesForCurrentSource();
  }

  updateArticlesBySource(source: Source): void {
    this.store.currentSource = source;
    this.store.loadArticlesForCurrentSource();
  }
}
