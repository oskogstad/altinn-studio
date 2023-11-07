import { Repository } from 'app-shared/types/Repository';
import { User } from 'app-shared/types/User';
import { useTranslation } from 'react-i18next';

/**
 * Hook that returns the username and org of a logged in user.
 *
 * @param user the User that is logged in
 * @param org the organisatio of the user
 * @param repository the reposiroty the application is in
 *
 * @returns {string} - The username and org
 */
export const useUserNameAndOrg = (user: User, org: string, repository: Repository): string => {
  const { t } = useTranslation();

  if (repository && org && user.login !== org) {
    return t('shared.header_user_for_org', {
      user: getUsername(user),
      org: getUsername(repository.owner),
    });
  }
  return getUsername(user);
};

const getUsername = (user: User | Repository['owner']) => user?.full_name || user?.login;
