/* Copyright Contributors to the Open Cluster Management project */

import { ManagedClusterSetDefinition } from '@open-cluster-management/resources'
import { AcmEmptyState, AcmPageContent } from '@open-cluster-management/ui-components'
import { PageSection } from '@patternfly/react-core'
import { useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RbacButton } from '../../../../../../components/Rbac'
import { rbacCreate } from '../../../../../../lib/rbac-util'
import { NavigationPath } from '../../../../../../NavigationPath'
import { ClusterPoolsTable } from '../../../ClusterPools/ClusterPools'
import { ClusterSetContext } from '../ClusterSetDetails'

export function ClusterSetClusterPoolsPageContent() {
    const { t } = useTranslation(['cluster'])
    const { clusterSet, clusterPools } = useContext(ClusterSetContext)
    return (
        <AcmPageContent id="cluster-pools">
            <PageSection>
                <ClusterPoolsTable
                    clusterPools={clusterPools!}
                    emptyState={
                        <AcmEmptyState
                            key="mcEmptyState"
                            title={t('managed.clusterSets.clusterPools.emptyStateHeader')}
                            message={
                                <Trans
                                    i18nKey={'cluster:managed.clusterSets.clusterPools.emptyStateMsg'}
                                    components={{ bold: <strong /> }}
                                />
                            }
                            action={
                                <RbacButton
                                    component={Link}
                                    to={NavigationPath.clusterSetManage.replace(':id', clusterSet!.metadata.name!)}
                                    variant="primary"
                                    rbac={[
                                        rbacCreate(
                                            ManagedClusterSetDefinition,
                                            undefined,
                                            clusterSet!.metadata.name,
                                            'join'
                                        ),
                                    ]}
                                >
                                    {t('managed.clusterSets.clusters.emptyStateButton')}
                                </RbacButton>
                            }
                        />
                    }
                />
            </PageSection>
        </AcmPageContent>
    )
}
