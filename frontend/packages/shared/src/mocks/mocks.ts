import {
  AppDeploymentsResponse,
  AppReleasesResponse,
  CreateRepoCommitPayload,
  DatamodelMetadataResponse,
  SearchRepositoryResponse,
} from 'app-shared/types/api';
import { LayoutSets } from 'app-shared/types/api/LayoutSetsResponse';
import { NewsList } from 'app-shared/types/api/NewsList';
import { BranchStatus } from 'app-shared/types/BranchStatus';
import { Commit } from 'app-shared/types/Commit';
import { OrgsState } from 'app-shared/types/OrgsState';
import { RepoStatus } from 'app-shared/types/RepoStatus';
import { RuleConfig } from 'app-shared/types/RuleConfig';
import { ITextResourcesWithLanguage } from 'app-shared/types/global';
import { User } from 'app-shared/types/Repository';
import { AppConfig } from 'app-shared/types/AppConfig';
import { Policy } from '@altinn/policy-editor';
import { ApplicationMetadata } from 'app-shared/types/ApplicationMetadata';
import { Resource, ResourceVersionStatus, Validation } from 'app-shared/types/ResourceAdm';
import { AppLibVersion } from 'app-shared/types/AppLibVersion';
import { BuildResult, BuildStatus } from 'app-shared/types/Build';
import { AppDeployment } from 'app-shared/types/AppDeployment';
import { DeployEnvironment } from 'app-shared/types/DeployEnvironment';
import { Organization } from 'app-shared/types/Organization';
import { Repository } from 'app-shared/types/Repository';

export const appReleasesResponse: AppReleasesResponse = {
  results: [],
};

export const branchStatus: BranchStatus = {
  commit: {
    author: '',
    committer: '',
    id: '',
  },
  name: '',
};

export const datamodelMetadataResponse: DatamodelMetadataResponse = {
  elements: {},
};

export const appDeploymentsResponse: AppDeploymentsResponse = {
  results: [],
};

export const appDeployment: AppDeployment = {
  id: '',
  tagName: '',
  app: '',
  org: '',
  envName: '',
  deployedInEnv: false,
  createdBy: '',
  created: '',
  build: {
    id: '',
    status: BuildStatus.completed,
    result: BuildResult.succeeded,
    started: '',
    finished: '',
  },
};

export const deployEnvironment: DeployEnvironment = {
  appsUrl: '',
  platformUrl: '',
  hostname: '',
  appPrefix: '',
  platformPrefix: '',
  name: '',
  type: '',
};

export const layoutSets: LayoutSets = {
  sets: [],
};

export const newsList: NewsList = {
  news: [],
};

export const orgsState: OrgsState = {
  orgs: {},
};

export const commit: Commit = {
  message: '',
  author: { name: '', email: '', when: new Date(null) },
  comitter: { name: '', email: '', when: new Date(null) },
  sha: '',
  messageShort: '',
  encoding: '',
};

export const repoStatus: RepoStatus = {
  aheadBy: 0,
  behindBy: 0,
  contentStatus: [],
  hasMergeConflict: false,
  repositoryStatus: '',
};

export const ruleConfig: RuleConfig = {
  data: {
    ruleConnection: {},
    conditionalRendering: {},
  },
};

export const textResourcesWithLanguage: ITextResourcesWithLanguage = {
  language: '',
  resources: [],
};

export const user: User = {
  avatar_url: '',
  email: '',
  full_name: '',
  id: 1,
  login: '',
  userType: 0,
};

export const appConfig: AppConfig = {
  repositoryName: '',
  serviceName: '',
  serviceId: '',
  serviceDescription: '',
};

export const policy: Policy = {
  rules: [],
  requiredAuthenticationLevelEndUser: '0',
  requiredAuthenticationLevelOrg: '',
};

export const applicationMetadata: ApplicationMetadata = {
  id: '',
  org: '',
};

export const resourceVersionStatus: ResourceVersionStatus = {
  publishedVersions: [],
};

export const validation: Validation = {
  status: 200,
  errors: [],
};

export const appLibVersion: AppLibVersion = {
  version: '',
};

export const repository: Repository = {
  clone_url: '',
  created_at: '',
  default_branch: '',
  description: '',
  empty: false,
  fork: false,
  forks_count: 0,
  full_name: '',
  html_url: '',
  id: 1,
  is_cloned_to_local: false,
  mirror: false,
  name: '',
  open_issues_count: 0,
  owner: {
    avatar_url: '',
    email: '',
    full_name: '',
    id: 1,
    login: '',
    userType: 0,
  },
  permissions: {
    admin: false,
    pull: false,
    push: false,
  },
  private: false,
  repositoryCreatedStatus: 0,
  size: 0,
  ssh_url: '',
  stars_count: 0,
  updated_at: '',
  watchers_count: 0,
  website: '',
};

export const createRepoCommitPayload: CreateRepoCommitPayload = {
  message: '',
  org: '',
  repository: '',
};

export const organization: Organization = {
  avatar_url: '',
  id: 1,
  username: '',
};

export const resource: Resource = {
  identifier: '',
  title: {
    nb: '',
    nn: '',
    en: '',
  },
};

export const searchRepositoryResponse: SearchRepositoryResponse = {
  data: [],
  ok: false,
  totalCount: 0,
  totalPages: 0,
};
