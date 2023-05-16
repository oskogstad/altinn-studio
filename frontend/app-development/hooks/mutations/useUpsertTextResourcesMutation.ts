import { ITextResource, ITextResources } from 'app-shared/types/global';
import { useMutation } from '@tanstack/react-query';
import { queryClient, useServicesContext } from '../../common/ServiceContext';
import { QueryKey } from '../../types/QueryKey';
import { convertTextResourcesArrayToObject, modifyTextResources } from 'app-shared/utils/textResourceUtils';
import { usePreviewConnection } from "app-shared/providers/PreviewConnectionContext";

export interface UpsertTextResourcesMutationArgs {
  language: string;
  textResources: ITextResource[];
}

export const useUpsertTextResourcesMutation = (org: string, app: string) => {
  const previewConnection = usePreviewConnection();
  const { upsertTextResources } = useServicesContext();
  return useMutation({
    mutationFn: ({ language, textResources }: UpsertTextResourcesMutationArgs) =>
      upsertTextResources(
        org,
        app,
        language,
        convertTextResourcesArrayToObject(textResources)
      ).then(() => ({ language, textResources })),
    onSuccess: async ({ language, textResources }: UpsertTextResourcesMutationArgs) => {
      if (previewConnection && previewConnection.state === "Connected") {
        await previewConnection.send("sendMessage", "reload-layouts").catch(function (err) {
          return console.error(err.toString());
        });
      }
      queryClient.setQueryData(
        [QueryKey.TextResources, org, app],
        (oldTexts: ITextResources): ITextResources => modifyTextResources(oldTexts, language, textResources)
      )
    }
  });
};
