/*
 * Copyright (c) 2018-2021 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

import { FastifyInstance, FastifyRequest } from 'fastify';
import { baseApiPath } from '../constants/config';
import { namespacedSchema } from '../constants/schemas';
import { getDevWorkspaceClient } from './helper';
import { getSchema } from '../services/helpers';
import { restParams } from '../typings/models';

export function registerCheApi(server: FastifyInstance) {
  server.get(
    `${baseApiPath}/namespace/:namespace/init`,
    getSchema({
      tags: ['che-namespace init'],
      params: namespacedSchema,
      response: {
        200: {
          description: 'Succesful response',
          type: 'boolean'
        }
      }
    }),
    async (request: FastifyRequest) => {
      const {namespace} = request.params as restParams.INamespacedParam;
      const {cheApi} = await getDevWorkspaceClient(request);
      try {
        await cheApi.initializeNamespace(namespace);
      } catch (e) {
        return Promise.reject(e);
      }
      return Promise.resolve(true);
    }
  );
}
