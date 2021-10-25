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

import { ApplicationInfo } from '@eclipse-che/common';
import { FastifyInstance } from 'fastify';
import { baseApiPath } from '../constants/config';
import { clusterConsoleGroup, clusterConsoleIcon, clusterConsoleTitle, clusterConsoleUrl } from '../devworkspace-client/services/cluster-info';
import { getSchema } from '../services/helpers';

const tags = ['clusterInfo'];

export function registerClusterInfo(server: FastifyInstance) {

  server.get(
    `${baseApiPath}/cluster-info`,
    getSchema({ tags }),
    async () => ({
      icon: clusterConsoleIcon,
      title: clusterConsoleTitle,
      url: clusterConsoleUrl,
      group: clusterConsoleGroup,
    } as ApplicationInfo)
  );

}
