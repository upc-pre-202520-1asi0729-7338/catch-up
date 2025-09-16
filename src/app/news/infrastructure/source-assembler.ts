import {LogoApi} from '../../shared/infrastructure/logo-api';
import {SourceResource, SourcesResponse} from './sources-response';
import {Source} from '../domain/model/source.entity';

export class SourceAssembler {
  static logoApi: LogoApi;
  static withLogoApi(logoApi: LogoApi) {
    this.logoApi = logoApi;
  }
  static toEntityFromResource(resource: SourceResource): Source {
    return {
      id: resource.id,
      name: resource.name,
      url: resource.url,
      urlToLogo: this.logoApi.getUrlToLogo(resource)
    };
  }

  static toEntitiesFromResponse(response: SourcesResponse): Source[] {
    return response.sources.map(source => this.toEntityFromResource(source));
  }
}
