export type OfficeType = 'br' | 'crm_rm' | 'do' | 'cb' | 'rao' | 'dao';

export interface OfficeInterface {
    id?: number;
    name: string;
    bn_name?: string;
    code?: string;
    recommended_manpower?: number;
    description?: string;
    address?: string;
    type: OfficeType,
    parent_id: number | null
}
