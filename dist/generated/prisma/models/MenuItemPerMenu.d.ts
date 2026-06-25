import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model MenuItemPerMenu
 *
 */
export type MenuItemPerMenuModel = runtime.Types.Result.DefaultSelection<Prisma.$MenuItemPerMenuPayload>;
export type AggregateMenuItemPerMenu = {
    _count: MenuItemPerMenuCountAggregateOutputType | null;
    _avg: MenuItemPerMenuAvgAggregateOutputType | null;
    _sum: MenuItemPerMenuSumAggregateOutputType | null;
    _min: MenuItemPerMenuMinAggregateOutputType | null;
    _max: MenuItemPerMenuMaxAggregateOutputType | null;
};
export type MenuItemPerMenuAvgAggregateOutputType = {
    id: number | null;
    menuId: number | null;
    menuItemId: number | null;
    parentId: number | null;
    order: number | null;
};
export type MenuItemPerMenuSumAggregateOutputType = {
    id: number | null;
    menuId: number | null;
    menuItemId: number | null;
    parentId: number | null;
    order: number | null;
};
export type MenuItemPerMenuMinAggregateOutputType = {
    id: number | null;
    menuId: number | null;
    menuItemId: number | null;
    parentId: number | null;
    order: number | null;
};
export type MenuItemPerMenuMaxAggregateOutputType = {
    id: number | null;
    menuId: number | null;
    menuItemId: number | null;
    parentId: number | null;
    order: number | null;
};
export type MenuItemPerMenuCountAggregateOutputType = {
    id: number;
    menuId: number;
    menuItemId: number;
    parentId: number;
    order: number;
    _all: number;
};
export type MenuItemPerMenuAvgAggregateInputType = {
    id?: true;
    menuId?: true;
    menuItemId?: true;
    parentId?: true;
    order?: true;
};
export type MenuItemPerMenuSumAggregateInputType = {
    id?: true;
    menuId?: true;
    menuItemId?: true;
    parentId?: true;
    order?: true;
};
export type MenuItemPerMenuMinAggregateInputType = {
    id?: true;
    menuId?: true;
    menuItemId?: true;
    parentId?: true;
    order?: true;
};
export type MenuItemPerMenuMaxAggregateInputType = {
    id?: true;
    menuId?: true;
    menuItemId?: true;
    parentId?: true;
    order?: true;
};
export type MenuItemPerMenuCountAggregateInputType = {
    id?: true;
    menuId?: true;
    menuItemId?: true;
    parentId?: true;
    order?: true;
    _all?: true;
};
export type MenuItemPerMenuAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItemPerMenu to aggregate.
     */
    where?: Prisma.MenuItemPerMenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuItemPerMenus to fetch.
     */
    orderBy?: Prisma.MenuItemPerMenuOrderByWithRelationInput | Prisma.MenuItemPerMenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MenuItemPerMenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuItemPerMenus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuItemPerMenus.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MenuItemPerMenus
    **/
    _count?: true | MenuItemPerMenuCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MenuItemPerMenuAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MenuItemPerMenuSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MenuItemPerMenuMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MenuItemPerMenuMaxAggregateInputType;
};
export type GetMenuItemPerMenuAggregateType<T extends MenuItemPerMenuAggregateArgs> = {
    [P in keyof T & keyof AggregateMenuItemPerMenu]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMenuItemPerMenu[P]> : Prisma.GetScalarType<T[P], AggregateMenuItemPerMenu[P]>;
};
export type MenuItemPerMenuGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuItemPerMenuWhereInput;
    orderBy?: Prisma.MenuItemPerMenuOrderByWithAggregationInput | Prisma.MenuItemPerMenuOrderByWithAggregationInput[];
    by: Prisma.MenuItemPerMenuScalarFieldEnum[] | Prisma.MenuItemPerMenuScalarFieldEnum;
    having?: Prisma.MenuItemPerMenuScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MenuItemPerMenuCountAggregateInputType | true;
    _avg?: MenuItemPerMenuAvgAggregateInputType;
    _sum?: MenuItemPerMenuSumAggregateInputType;
    _min?: MenuItemPerMenuMinAggregateInputType;
    _max?: MenuItemPerMenuMaxAggregateInputType;
};
export type MenuItemPerMenuGroupByOutputType = {
    id: number;
    menuId: number;
    menuItemId: number;
    parentId: number | null;
    order: number;
    _count: MenuItemPerMenuCountAggregateOutputType | null;
    _avg: MenuItemPerMenuAvgAggregateOutputType | null;
    _sum: MenuItemPerMenuSumAggregateOutputType | null;
    _min: MenuItemPerMenuMinAggregateOutputType | null;
    _max: MenuItemPerMenuMaxAggregateOutputType | null;
};
export type GetMenuItemPerMenuGroupByPayload<T extends MenuItemPerMenuGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MenuItemPerMenuGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MenuItemPerMenuGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MenuItemPerMenuGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MenuItemPerMenuGroupByOutputType[P]>;
}>>;
export type MenuItemPerMenuWhereInput = {
    AND?: Prisma.MenuItemPerMenuWhereInput | Prisma.MenuItemPerMenuWhereInput[];
    OR?: Prisma.MenuItemPerMenuWhereInput[];
    NOT?: Prisma.MenuItemPerMenuWhereInput | Prisma.MenuItemPerMenuWhereInput[];
    id?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    menuId?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    menuItemId?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    parentId?: Prisma.IntNullableFilter<"MenuItemPerMenu"> | number | null;
    order?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    menu?: Prisma.XOR<Prisma.MenuScalarRelationFilter, Prisma.MenuWhereInput>;
    menuItem?: Prisma.XOR<Prisma.MenuItemScalarRelationFilter, Prisma.MenuItemWhereInput>;
    parent?: Prisma.XOR<Prisma.MenuItemPerMenuNullableScalarRelationFilter, Prisma.MenuItemPerMenuWhereInput> | null;
    items?: Prisma.MenuItemPerMenuListRelationFilter;
};
export type MenuItemPerMenuOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    menuId?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    menu?: Prisma.MenuOrderByWithRelationInput;
    menuItem?: Prisma.MenuItemOrderByWithRelationInput;
    parent?: Prisma.MenuItemPerMenuOrderByWithRelationInput;
    items?: Prisma.MenuItemPerMenuOrderByRelationAggregateInput;
};
export type MenuItemPerMenuWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    menuId_menuItemId?: Prisma.MenuItemPerMenuMenuIdMenuItemIdCompoundUniqueInput;
    AND?: Prisma.MenuItemPerMenuWhereInput | Prisma.MenuItemPerMenuWhereInput[];
    OR?: Prisma.MenuItemPerMenuWhereInput[];
    NOT?: Prisma.MenuItemPerMenuWhereInput | Prisma.MenuItemPerMenuWhereInput[];
    menuId?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    menuItemId?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    parentId?: Prisma.IntNullableFilter<"MenuItemPerMenu"> | number | null;
    order?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    menu?: Prisma.XOR<Prisma.MenuScalarRelationFilter, Prisma.MenuWhereInput>;
    menuItem?: Prisma.XOR<Prisma.MenuItemScalarRelationFilter, Prisma.MenuItemWhereInput>;
    parent?: Prisma.XOR<Prisma.MenuItemPerMenuNullableScalarRelationFilter, Prisma.MenuItemPerMenuWhereInput> | null;
    items?: Prisma.MenuItemPerMenuListRelationFilter;
}, "id" | "menuId_menuItemId">;
export type MenuItemPerMenuOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    menuId?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    _count?: Prisma.MenuItemPerMenuCountOrderByAggregateInput;
    _avg?: Prisma.MenuItemPerMenuAvgOrderByAggregateInput;
    _max?: Prisma.MenuItemPerMenuMaxOrderByAggregateInput;
    _min?: Prisma.MenuItemPerMenuMinOrderByAggregateInput;
    _sum?: Prisma.MenuItemPerMenuSumOrderByAggregateInput;
};
export type MenuItemPerMenuScalarWhereWithAggregatesInput = {
    AND?: Prisma.MenuItemPerMenuScalarWhereWithAggregatesInput | Prisma.MenuItemPerMenuScalarWhereWithAggregatesInput[];
    OR?: Prisma.MenuItemPerMenuScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MenuItemPerMenuScalarWhereWithAggregatesInput | Prisma.MenuItemPerMenuScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"MenuItemPerMenu"> | number;
    menuId?: Prisma.IntWithAggregatesFilter<"MenuItemPerMenu"> | number;
    menuItemId?: Prisma.IntWithAggregatesFilter<"MenuItemPerMenu"> | number;
    parentId?: Prisma.IntNullableWithAggregatesFilter<"MenuItemPerMenu"> | number | null;
    order?: Prisma.IntWithAggregatesFilter<"MenuItemPerMenu"> | number;
};
export type MenuItemPerMenuCreateInput = {
    order?: number;
    menu: Prisma.MenuCreateNestedOneWithoutItemsInput;
    menuItem: Prisma.MenuItemCreateNestedOneWithoutPlacementsInput;
    parent?: Prisma.MenuItemPerMenuCreateNestedOneWithoutItemsInput;
    items?: Prisma.MenuItemPerMenuCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuUncheckedCreateInput = {
    id?: number;
    menuId: number;
    menuItemId: number;
    parentId?: number | null;
    order?: number;
    items?: Prisma.MenuItemPerMenuUncheckedCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuUpdateInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    menu?: Prisma.MenuUpdateOneRequiredWithoutItemsNestedInput;
    menuItem?: Prisma.MenuItemUpdateOneRequiredWithoutPlacementsNestedInput;
    parent?: Prisma.MenuItemPerMenuUpdateOneWithoutItemsNestedInput;
    items?: Prisma.MenuItemPerMenuUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuId?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItemId?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    items?: Prisma.MenuItemPerMenuUncheckedUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuCreateManyInput = {
    id?: number;
    menuId: number;
    menuItemId: number;
    parentId?: number | null;
    order?: number;
};
export type MenuItemPerMenuUpdateManyMutationInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MenuItemPerMenuUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuId?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItemId?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MenuItemPerMenuListRelationFilter = {
    every?: Prisma.MenuItemPerMenuWhereInput;
    some?: Prisma.MenuItemPerMenuWhereInput;
    none?: Prisma.MenuItemPerMenuWhereInput;
};
export type MenuItemPerMenuOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MenuItemPerMenuNullableScalarRelationFilter = {
    is?: Prisma.MenuItemPerMenuWhereInput | null;
    isNot?: Prisma.MenuItemPerMenuWhereInput | null;
};
export type MenuItemPerMenuMenuIdMenuItemIdCompoundUniqueInput = {
    menuId: number;
    menuItemId: number;
};
export type MenuItemPerMenuCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuId?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
};
export type MenuItemPerMenuAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuId?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
};
export type MenuItemPerMenuMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuId?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
};
export type MenuItemPerMenuMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuId?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
};
export type MenuItemPerMenuSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuId?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
};
export type MenuItemPerMenuCreateNestedManyWithoutMenuInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput> | Prisma.MenuItemPerMenuCreateWithoutMenuInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuInputEnvelope;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
};
export type MenuItemPerMenuUncheckedCreateNestedManyWithoutMenuInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput> | Prisma.MenuItemPerMenuCreateWithoutMenuInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuInputEnvelope;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
};
export type MenuItemPerMenuUpdateManyWithoutMenuNestedInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput> | Prisma.MenuItemPerMenuCreateWithoutMenuInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput[];
    upsert?: Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuInput | Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuInputEnvelope;
    set?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    disconnect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    delete?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    update?: Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuInput | Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuInput[];
    updateMany?: Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuInput | Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuInput[];
    deleteMany?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
};
export type MenuItemPerMenuUncheckedUpdateManyWithoutMenuNestedInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput> | Prisma.MenuItemPerMenuCreateWithoutMenuInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuInput[];
    upsert?: Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuInput | Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuInputEnvelope;
    set?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    disconnect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    delete?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    update?: Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuInput | Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuInput[];
    updateMany?: Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuInput | Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuInput[];
    deleteMany?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
};
export type MenuItemPerMenuCreateNestedManyWithoutMenuItemInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput> | Prisma.MenuItemPerMenuCreateWithoutMenuItemInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuItemInputEnvelope;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
};
export type MenuItemPerMenuUncheckedCreateNestedManyWithoutMenuItemInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput> | Prisma.MenuItemPerMenuCreateWithoutMenuItemInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuItemInputEnvelope;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
};
export type MenuItemPerMenuUpdateManyWithoutMenuItemNestedInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput> | Prisma.MenuItemPerMenuCreateWithoutMenuItemInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput[];
    upsert?: Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuItemInput | Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuItemInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuItemInputEnvelope;
    set?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    disconnect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    delete?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    update?: Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuItemInput | Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuItemInput[];
    updateMany?: Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuItemInput | Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuItemInput[];
    deleteMany?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
};
export type MenuItemPerMenuUncheckedUpdateManyWithoutMenuItemNestedInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput> | Prisma.MenuItemPerMenuCreateWithoutMenuItemInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutMenuItemInput[];
    upsert?: Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuItemInput | Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuItemInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyMenuItemInputEnvelope;
    set?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    disconnect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    delete?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    update?: Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuItemInput | Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuItemInput[];
    updateMany?: Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuItemInput | Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutMenuItemInput[];
    deleteMany?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
};
export type MenuItemPerMenuCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutItemsInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutItemsInput;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput;
};
export type MenuItemPerMenuCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput> | Prisma.MenuItemPerMenuCreateWithoutParentInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyParentInputEnvelope;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
};
export type MenuItemPerMenuUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput> | Prisma.MenuItemPerMenuCreateWithoutParentInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyParentInputEnvelope;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
};
export type MenuItemPerMenuUpdateOneWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutItemsInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.MenuItemPerMenuUpsertWithoutItemsInput;
    disconnect?: Prisma.MenuItemPerMenuWhereInput | boolean;
    delete?: Prisma.MenuItemPerMenuWhereInput | boolean;
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MenuItemPerMenuUpdateToOneWithWhereWithoutItemsInput, Prisma.MenuItemPerMenuUpdateWithoutItemsInput>, Prisma.MenuItemPerMenuUncheckedUpdateWithoutItemsInput>;
};
export type MenuItemPerMenuUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput> | Prisma.MenuItemPerMenuCreateWithoutParentInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutParentInput | Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyParentInputEnvelope;
    set?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    disconnect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    delete?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    update?: Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutParentInput | Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutParentInput | Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type MenuItemPerMenuUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput> | Prisma.MenuItemPerMenuCreateWithoutParentInput[] | Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput | Prisma.MenuItemPerMenuCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutParentInput | Prisma.MenuItemPerMenuUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.MenuItemPerMenuCreateManyParentInputEnvelope;
    set?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    disconnect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    delete?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    connect?: Prisma.MenuItemPerMenuWhereUniqueInput | Prisma.MenuItemPerMenuWhereUniqueInput[];
    update?: Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutParentInput | Prisma.MenuItemPerMenuUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutParentInput | Prisma.MenuItemPerMenuUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
};
export type MenuItemPerMenuCreateWithoutMenuInput = {
    order?: number;
    menuItem: Prisma.MenuItemCreateNestedOneWithoutPlacementsInput;
    parent?: Prisma.MenuItemPerMenuCreateNestedOneWithoutItemsInput;
    items?: Prisma.MenuItemPerMenuCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuUncheckedCreateWithoutMenuInput = {
    id?: number;
    menuItemId: number;
    parentId?: number | null;
    order?: number;
    items?: Prisma.MenuItemPerMenuUncheckedCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuCreateOrConnectWithoutMenuInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput>;
};
export type MenuItemPerMenuCreateManyMenuInputEnvelope = {
    data: Prisma.MenuItemPerMenuCreateManyMenuInput | Prisma.MenuItemPerMenuCreateManyMenuInput[];
};
export type MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    update: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutMenuInput>;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuInput>;
};
export type MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutMenuInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutMenuInput>;
};
export type MenuItemPerMenuUpdateManyWithWhereWithoutMenuInput = {
    where: Prisma.MenuItemPerMenuScalarWhereInput;
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateManyMutationInput, Prisma.MenuItemPerMenuUncheckedUpdateManyWithoutMenuInput>;
};
export type MenuItemPerMenuScalarWhereInput = {
    AND?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
    OR?: Prisma.MenuItemPerMenuScalarWhereInput[];
    NOT?: Prisma.MenuItemPerMenuScalarWhereInput | Prisma.MenuItemPerMenuScalarWhereInput[];
    id?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    menuId?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    menuItemId?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
    parentId?: Prisma.IntNullableFilter<"MenuItemPerMenu"> | number | null;
    order?: Prisma.IntFilter<"MenuItemPerMenu"> | number;
};
export type MenuItemPerMenuCreateWithoutMenuItemInput = {
    order?: number;
    menu: Prisma.MenuCreateNestedOneWithoutItemsInput;
    parent?: Prisma.MenuItemPerMenuCreateNestedOneWithoutItemsInput;
    items?: Prisma.MenuItemPerMenuCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuUncheckedCreateWithoutMenuItemInput = {
    id?: number;
    menuId: number;
    parentId?: number | null;
    order?: number;
    items?: Prisma.MenuItemPerMenuUncheckedCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuCreateOrConnectWithoutMenuItemInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput>;
};
export type MenuItemPerMenuCreateManyMenuItemInputEnvelope = {
    data: Prisma.MenuItemPerMenuCreateManyMenuItemInput | Prisma.MenuItemPerMenuCreateManyMenuItemInput[];
};
export type MenuItemPerMenuUpsertWithWhereUniqueWithoutMenuItemInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    update: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutMenuItemInput>;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutMenuItemInput>;
};
export type MenuItemPerMenuUpdateWithWhereUniqueWithoutMenuItemInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutMenuItemInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutMenuItemInput>;
};
export type MenuItemPerMenuUpdateManyWithWhereWithoutMenuItemInput = {
    where: Prisma.MenuItemPerMenuScalarWhereInput;
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateManyMutationInput, Prisma.MenuItemPerMenuUncheckedUpdateManyWithoutMenuItemInput>;
};
export type MenuItemPerMenuCreateWithoutItemsInput = {
    order?: number;
    menu: Prisma.MenuCreateNestedOneWithoutItemsInput;
    menuItem: Prisma.MenuItemCreateNestedOneWithoutPlacementsInput;
    parent?: Prisma.MenuItemPerMenuCreateNestedOneWithoutItemsInput;
};
export type MenuItemPerMenuUncheckedCreateWithoutItemsInput = {
    id?: number;
    menuId: number;
    menuItemId: number;
    parentId?: number | null;
    order?: number;
};
export type MenuItemPerMenuCreateOrConnectWithoutItemsInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutItemsInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutItemsInput>;
};
export type MenuItemPerMenuCreateWithoutParentInput = {
    order?: number;
    menu: Prisma.MenuCreateNestedOneWithoutItemsInput;
    menuItem: Prisma.MenuItemCreateNestedOneWithoutPlacementsInput;
    items?: Prisma.MenuItemPerMenuCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuUncheckedCreateWithoutParentInput = {
    id?: number;
    menuId: number;
    menuItemId: number;
    order?: number;
    items?: Prisma.MenuItemPerMenuUncheckedCreateNestedManyWithoutParentInput;
};
export type MenuItemPerMenuCreateOrConnectWithoutParentInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput>;
};
export type MenuItemPerMenuCreateManyParentInputEnvelope = {
    data: Prisma.MenuItemPerMenuCreateManyParentInput | Prisma.MenuItemPerMenuCreateManyParentInput[];
};
export type MenuItemPerMenuUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutItemsInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutItemsInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutItemsInput>;
    where?: Prisma.MenuItemPerMenuWhereInput;
};
export type MenuItemPerMenuUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.MenuItemPerMenuWhereInput;
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutItemsInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutItemsInput>;
};
export type MenuItemPerMenuUpdateWithoutItemsInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    menu?: Prisma.MenuUpdateOneRequiredWithoutItemsNestedInput;
    menuItem?: Prisma.MenuItemUpdateOneRequiredWithoutPlacementsNestedInput;
    parent?: Prisma.MenuItemPerMenuUpdateOneWithoutItemsNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuId?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItemId?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MenuItemPerMenuUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    update: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedCreateWithoutParentInput>;
};
export type MenuItemPerMenuUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateWithoutParentInput, Prisma.MenuItemPerMenuUncheckedUpdateWithoutParentInput>;
};
export type MenuItemPerMenuUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.MenuItemPerMenuScalarWhereInput;
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateManyMutationInput, Prisma.MenuItemPerMenuUncheckedUpdateManyWithoutParentInput>;
};
export type MenuItemPerMenuCreateManyMenuInput = {
    id?: number;
    menuItemId: number;
    parentId?: number | null;
    order?: number;
};
export type MenuItemPerMenuUpdateWithoutMenuInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItem?: Prisma.MenuItemUpdateOneRequiredWithoutPlacementsNestedInput;
    parent?: Prisma.MenuItemPerMenuUpdateOneWithoutItemsNestedInput;
    items?: Prisma.MenuItemPerMenuUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateWithoutMenuInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItemId?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    items?: Prisma.MenuItemPerMenuUncheckedUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateManyWithoutMenuInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItemId?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MenuItemPerMenuCreateManyMenuItemInput = {
    id?: number;
    menuId: number;
    parentId?: number | null;
    order?: number;
};
export type MenuItemPerMenuUpdateWithoutMenuItemInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    menu?: Prisma.MenuUpdateOneRequiredWithoutItemsNestedInput;
    parent?: Prisma.MenuItemPerMenuUpdateOneWithoutItemsNestedInput;
    items?: Prisma.MenuItemPerMenuUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateWithoutMenuItemInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuId?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    items?: Prisma.MenuItemPerMenuUncheckedUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateManyWithoutMenuItemInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuId?: Prisma.IntFieldUpdateOperationsInput | number;
    parentId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type MenuItemPerMenuCreateManyParentInput = {
    id?: number;
    menuId: number;
    menuItemId: number;
    order?: number;
};
export type MenuItemPerMenuUpdateWithoutParentInput = {
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    menu?: Prisma.MenuUpdateOneRequiredWithoutItemsNestedInput;
    menuItem?: Prisma.MenuItemUpdateOneRequiredWithoutPlacementsNestedInput;
    items?: Prisma.MenuItemPerMenuUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateWithoutParentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuId?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItemId?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    items?: Prisma.MenuItemPerMenuUncheckedUpdateManyWithoutParentNestedInput;
};
export type MenuItemPerMenuUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    menuId?: Prisma.IntFieldUpdateOperationsInput | number;
    menuItemId?: Prisma.IntFieldUpdateOperationsInput | number;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
/**
 * Count Type MenuItemPerMenuCountOutputType
 */
export type MenuItemPerMenuCountOutputType = {
    items: number;
};
export type MenuItemPerMenuCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | MenuItemPerMenuCountOutputTypeCountItemsArgs;
};
/**
 * MenuItemPerMenuCountOutputType without action
 */
export type MenuItemPerMenuCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenuCountOutputType
     */
    select?: Prisma.MenuItemPerMenuCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * MenuItemPerMenuCountOutputType without action
 */
export type MenuItemPerMenuCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuItemPerMenuWhereInput;
};
export type MenuItemPerMenuSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    menuId?: boolean;
    menuItemId?: boolean;
    parentId?: boolean;
    order?: boolean;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.MenuItemPerMenu$parentArgs<ExtArgs>;
    items?: boolean | Prisma.MenuItemPerMenu$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.MenuItemPerMenuCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menuItemPerMenu"]>;
export type MenuItemPerMenuSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    menuId?: boolean;
    menuItemId?: boolean;
    parentId?: boolean;
    order?: boolean;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.MenuItemPerMenu$parentArgs<ExtArgs>;
}, ExtArgs["result"]["menuItemPerMenu"]>;
export type MenuItemPerMenuSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    menuId?: boolean;
    menuItemId?: boolean;
    parentId?: boolean;
    order?: boolean;
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.MenuItemPerMenu$parentArgs<ExtArgs>;
}, ExtArgs["result"]["menuItemPerMenu"]>;
export type MenuItemPerMenuSelectScalar = {
    id?: boolean;
    menuId?: boolean;
    menuItemId?: boolean;
    parentId?: boolean;
    order?: boolean;
};
export type MenuItemPerMenuOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "menuId" | "menuItemId" | "parentId" | "order", ExtArgs["result"]["menuItemPerMenu"]>;
export type MenuItemPerMenuInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.MenuItemPerMenu$parentArgs<ExtArgs>;
    items?: boolean | Prisma.MenuItemPerMenu$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.MenuItemPerMenuCountOutputTypeDefaultArgs<ExtArgs>;
};
export type MenuItemPerMenuIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.MenuItemPerMenu$parentArgs<ExtArgs>;
};
export type MenuItemPerMenuIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menu?: boolean | Prisma.MenuDefaultArgs<ExtArgs>;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
    parent?: boolean | Prisma.MenuItemPerMenu$parentArgs<ExtArgs>;
};
export type $MenuItemPerMenuPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MenuItemPerMenu";
    objects: {
        menu: Prisma.$MenuPayload<ExtArgs>;
        menuItem: Prisma.$MenuItemPayload<ExtArgs>;
        parent: Prisma.$MenuItemPerMenuPayload<ExtArgs> | null;
        items: Prisma.$MenuItemPerMenuPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        menuId: number;
        menuItemId: number;
        parentId: number | null;
        order: number;
    }, ExtArgs["result"]["menuItemPerMenu"]>;
    composites: {};
};
export type MenuItemPerMenuGetPayload<S extends boolean | null | undefined | MenuItemPerMenuDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload, S>;
export type MenuItemPerMenuCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MenuItemPerMenuFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MenuItemPerMenuCountAggregateInputType | true;
};
export interface MenuItemPerMenuDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MenuItemPerMenu'];
        meta: {
            name: 'MenuItemPerMenu';
        };
    };
    /**
     * Find zero or one MenuItemPerMenu that matches the filter.
     * @param {MenuItemPerMenuFindUniqueArgs} args - Arguments to find a MenuItemPerMenu
     * @example
     * // Get one MenuItemPerMenu
     * const menuItemPerMenu = await prisma.menuItemPerMenu.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuItemPerMenuFindUniqueArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MenuItemPerMenu that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuItemPerMenuFindUniqueOrThrowArgs} args - Arguments to find a MenuItemPerMenu
     * @example
     * // Get one MenuItemPerMenu
     * const menuItemPerMenu = await prisma.menuItemPerMenu.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuItemPerMenuFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MenuItemPerMenu that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemPerMenuFindFirstArgs} args - Arguments to find a MenuItemPerMenu
     * @example
     * // Get one MenuItemPerMenu
     * const menuItemPerMenu = await prisma.menuItemPerMenu.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuItemPerMenuFindFirstArgs>(args?: Prisma.SelectSubset<T, MenuItemPerMenuFindFirstArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MenuItemPerMenu that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemPerMenuFindFirstOrThrowArgs} args - Arguments to find a MenuItemPerMenu
     * @example
     * // Get one MenuItemPerMenu
     * const menuItemPerMenu = await prisma.menuItemPerMenu.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuItemPerMenuFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MenuItemPerMenuFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MenuItemPerMenus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemPerMenuFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuItemPerMenus
     * const menuItemPerMenus = await prisma.menuItemPerMenu.findMany()
     *
     * // Get first 10 MenuItemPerMenus
     * const menuItemPerMenus = await prisma.menuItemPerMenu.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const menuItemPerMenuWithIdOnly = await prisma.menuItemPerMenu.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MenuItemPerMenuFindManyArgs>(args?: Prisma.SelectSubset<T, MenuItemPerMenuFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MenuItemPerMenu.
     * @param {MenuItemPerMenuCreateArgs} args - Arguments to create a MenuItemPerMenu.
     * @example
     * // Create one MenuItemPerMenu
     * const MenuItemPerMenu = await prisma.menuItemPerMenu.create({
     *   data: {
     *     // ... data to create a MenuItemPerMenu
     *   }
     * })
     *
     */
    create<T extends MenuItemPerMenuCreateArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuCreateArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MenuItemPerMenus.
     * @param {MenuItemPerMenuCreateManyArgs} args - Arguments to create many MenuItemPerMenus.
     * @example
     * // Create many MenuItemPerMenus
     * const menuItemPerMenu = await prisma.menuItemPerMenu.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MenuItemPerMenuCreateManyArgs>(args?: Prisma.SelectSubset<T, MenuItemPerMenuCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MenuItemPerMenus and returns the data saved in the database.
     * @param {MenuItemPerMenuCreateManyAndReturnArgs} args - Arguments to create many MenuItemPerMenus.
     * @example
     * // Create many MenuItemPerMenus
     * const menuItemPerMenu = await prisma.menuItemPerMenu.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MenuItemPerMenus and only return the `id`
     * const menuItemPerMenuWithIdOnly = await prisma.menuItemPerMenu.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MenuItemPerMenuCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MenuItemPerMenuCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MenuItemPerMenu.
     * @param {MenuItemPerMenuDeleteArgs} args - Arguments to delete one MenuItemPerMenu.
     * @example
     * // Delete one MenuItemPerMenu
     * const MenuItemPerMenu = await prisma.menuItemPerMenu.delete({
     *   where: {
     *     // ... filter to delete one MenuItemPerMenu
     *   }
     * })
     *
     */
    delete<T extends MenuItemPerMenuDeleteArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuDeleteArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MenuItemPerMenu.
     * @param {MenuItemPerMenuUpdateArgs} args - Arguments to update one MenuItemPerMenu.
     * @example
     * // Update one MenuItemPerMenu
     * const menuItemPerMenu = await prisma.menuItemPerMenu.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MenuItemPerMenuUpdateArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuUpdateArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MenuItemPerMenus.
     * @param {MenuItemPerMenuDeleteManyArgs} args - Arguments to filter MenuItemPerMenus to delete.
     * @example
     * // Delete a few MenuItemPerMenus
     * const { count } = await prisma.menuItemPerMenu.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MenuItemPerMenuDeleteManyArgs>(args?: Prisma.SelectSubset<T, MenuItemPerMenuDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MenuItemPerMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemPerMenuUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuItemPerMenus
     * const menuItemPerMenu = await prisma.menuItemPerMenu.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MenuItemPerMenuUpdateManyArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MenuItemPerMenus and returns the data updated in the database.
     * @param {MenuItemPerMenuUpdateManyAndReturnArgs} args - Arguments to update many MenuItemPerMenus.
     * @example
     * // Update many MenuItemPerMenus
     * const menuItemPerMenu = await prisma.menuItemPerMenu.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MenuItemPerMenus and only return the `id`
     * const menuItemPerMenuWithIdOnly = await prisma.menuItemPerMenu.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends MenuItemPerMenuUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MenuItemPerMenu.
     * @param {MenuItemPerMenuUpsertArgs} args - Arguments to update or create a MenuItemPerMenu.
     * @example
     * // Update or create a MenuItemPerMenu
     * const menuItemPerMenu = await prisma.menuItemPerMenu.upsert({
     *   create: {
     *     // ... data to create a MenuItemPerMenu
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuItemPerMenu we want to update
     *   }
     * })
     */
    upsert<T extends MenuItemPerMenuUpsertArgs>(args: Prisma.SelectSubset<T, MenuItemPerMenuUpsertArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MenuItemPerMenus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemPerMenuCountArgs} args - Arguments to filter MenuItemPerMenus to count.
     * @example
     * // Count the number of MenuItemPerMenus
     * const count = await prisma.menuItemPerMenu.count({
     *   where: {
     *     // ... the filter for the MenuItemPerMenus we want to count
     *   }
     * })
    **/
    count<T extends MenuItemPerMenuCountArgs>(args?: Prisma.Subset<T, MenuItemPerMenuCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MenuItemPerMenuCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MenuItemPerMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemPerMenuAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuItemPerMenuAggregateArgs>(args: Prisma.Subset<T, MenuItemPerMenuAggregateArgs>): Prisma.PrismaPromise<GetMenuItemPerMenuAggregateType<T>>;
    /**
     * Group by MenuItemPerMenu.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemPerMenuGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends MenuItemPerMenuGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MenuItemPerMenuGroupByArgs['orderBy'];
    } : {
        orderBy?: MenuItemPerMenuGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MenuItemPerMenuGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuItemPerMenuGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MenuItemPerMenu model
     */
    readonly fields: MenuItemPerMenuFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MenuItemPerMenu.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MenuItemPerMenuClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    menu<T extends Prisma.MenuDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MenuDefaultArgs<ExtArgs>>): Prisma.Prisma__MenuClient<runtime.Types.Result.GetResult<Prisma.$MenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    menuItem<T extends Prisma.MenuItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MenuItemDefaultArgs<ExtArgs>>): Prisma.Prisma__MenuItemClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    parent<T extends Prisma.MenuItemPerMenu$parentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MenuItemPerMenu$parentArgs<ExtArgs>>): Prisma.Prisma__MenuItemPerMenuClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.MenuItemPerMenu$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MenuItemPerMenu$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuItemPerMenuPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the MenuItemPerMenu model
 */
export interface MenuItemPerMenuFieldRefs {
    readonly id: Prisma.FieldRef<"MenuItemPerMenu", 'Int'>;
    readonly menuId: Prisma.FieldRef<"MenuItemPerMenu", 'Int'>;
    readonly menuItemId: Prisma.FieldRef<"MenuItemPerMenu", 'Int'>;
    readonly parentId: Prisma.FieldRef<"MenuItemPerMenu", 'Int'>;
    readonly order: Prisma.FieldRef<"MenuItemPerMenu", 'Int'>;
}
/**
 * MenuItemPerMenu findUnique
 */
export type MenuItemPerMenuFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * Filter, which MenuItemPerMenu to fetch.
     */
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
};
/**
 * MenuItemPerMenu findUniqueOrThrow
 */
export type MenuItemPerMenuFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * Filter, which MenuItemPerMenu to fetch.
     */
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
};
/**
 * MenuItemPerMenu findFirst
 */
export type MenuItemPerMenuFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * Filter, which MenuItemPerMenu to fetch.
     */
    where?: Prisma.MenuItemPerMenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuItemPerMenus to fetch.
     */
    orderBy?: Prisma.MenuItemPerMenuOrderByWithRelationInput | Prisma.MenuItemPerMenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MenuItemPerMenus.
     */
    cursor?: Prisma.MenuItemPerMenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuItemPerMenus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuItemPerMenus.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MenuItemPerMenus.
     */
    distinct?: Prisma.MenuItemPerMenuScalarFieldEnum | Prisma.MenuItemPerMenuScalarFieldEnum[];
};
/**
 * MenuItemPerMenu findFirstOrThrow
 */
export type MenuItemPerMenuFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * Filter, which MenuItemPerMenu to fetch.
     */
    where?: Prisma.MenuItemPerMenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuItemPerMenus to fetch.
     */
    orderBy?: Prisma.MenuItemPerMenuOrderByWithRelationInput | Prisma.MenuItemPerMenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MenuItemPerMenus.
     */
    cursor?: Prisma.MenuItemPerMenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuItemPerMenus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuItemPerMenus.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MenuItemPerMenus.
     */
    distinct?: Prisma.MenuItemPerMenuScalarFieldEnum | Prisma.MenuItemPerMenuScalarFieldEnum[];
};
/**
 * MenuItemPerMenu findMany
 */
export type MenuItemPerMenuFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * Filter, which MenuItemPerMenus to fetch.
     */
    where?: Prisma.MenuItemPerMenuWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuItemPerMenus to fetch.
     */
    orderBy?: Prisma.MenuItemPerMenuOrderByWithRelationInput | Prisma.MenuItemPerMenuOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MenuItemPerMenus.
     */
    cursor?: Prisma.MenuItemPerMenuWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuItemPerMenus from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuItemPerMenus.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MenuItemPerMenus.
     */
    distinct?: Prisma.MenuItemPerMenuScalarFieldEnum | Prisma.MenuItemPerMenuScalarFieldEnum[];
};
/**
 * MenuItemPerMenu create
 */
export type MenuItemPerMenuCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * The data needed to create a MenuItemPerMenu.
     */
    data: Prisma.XOR<Prisma.MenuItemPerMenuCreateInput, Prisma.MenuItemPerMenuUncheckedCreateInput>;
};
/**
 * MenuItemPerMenu createMany
 */
export type MenuItemPerMenuCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuItemPerMenus.
     */
    data: Prisma.MenuItemPerMenuCreateManyInput | Prisma.MenuItemPerMenuCreateManyInput[];
};
/**
 * MenuItemPerMenu createManyAndReturn
 */
export type MenuItemPerMenuCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * The data used to create many MenuItemPerMenus.
     */
    data: Prisma.MenuItemPerMenuCreateManyInput | Prisma.MenuItemPerMenuCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MenuItemPerMenu update
 */
export type MenuItemPerMenuUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * The data needed to update a MenuItemPerMenu.
     */
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateInput, Prisma.MenuItemPerMenuUncheckedUpdateInput>;
    /**
     * Choose, which MenuItemPerMenu to update.
     */
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
};
/**
 * MenuItemPerMenu updateMany
 */
export type MenuItemPerMenuUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuItemPerMenus.
     */
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateManyMutationInput, Prisma.MenuItemPerMenuUncheckedUpdateManyInput>;
    /**
     * Filter which MenuItemPerMenus to update
     */
    where?: Prisma.MenuItemPerMenuWhereInput;
    /**
     * Limit how many MenuItemPerMenus to update.
     */
    limit?: number;
};
/**
 * MenuItemPerMenu updateManyAndReturn
 */
export type MenuItemPerMenuUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * The data used to update MenuItemPerMenus.
     */
    data: Prisma.XOR<Prisma.MenuItemPerMenuUpdateManyMutationInput, Prisma.MenuItemPerMenuUncheckedUpdateManyInput>;
    /**
     * Filter which MenuItemPerMenus to update
     */
    where?: Prisma.MenuItemPerMenuWhereInput;
    /**
     * Limit how many MenuItemPerMenus to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MenuItemPerMenu upsert
 */
export type MenuItemPerMenuUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * The filter to search for the MenuItemPerMenu to update in case it exists.
     */
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
    /**
     * In case the MenuItemPerMenu found by the `where` argument doesn't exist, create a new MenuItemPerMenu with this data.
     */
    create: Prisma.XOR<Prisma.MenuItemPerMenuCreateInput, Prisma.MenuItemPerMenuUncheckedCreateInput>;
    /**
     * In case the MenuItemPerMenu was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MenuItemPerMenuUpdateInput, Prisma.MenuItemPerMenuUncheckedUpdateInput>;
};
/**
 * MenuItemPerMenu delete
 */
export type MenuItemPerMenuDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    /**
     * Filter which MenuItemPerMenu to delete.
     */
    where: Prisma.MenuItemPerMenuWhereUniqueInput;
};
/**
 * MenuItemPerMenu deleteMany
 */
export type MenuItemPerMenuDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItemPerMenus to delete
     */
    where?: Prisma.MenuItemPerMenuWhereInput;
    /**
     * Limit how many MenuItemPerMenus to delete.
     */
    limit?: number;
};
/**
 * MenuItemPerMenu.parent
 */
export type MenuItemPerMenu$parentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    where?: Prisma.MenuItemPerMenuWhereInput;
};
/**
 * MenuItemPerMenu.items
 */
export type MenuItemPerMenu$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
    where?: Prisma.MenuItemPerMenuWhereInput;
    orderBy?: Prisma.MenuItemPerMenuOrderByWithRelationInput | Prisma.MenuItemPerMenuOrderByWithRelationInput[];
    cursor?: Prisma.MenuItemPerMenuWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MenuItemPerMenuScalarFieldEnum | Prisma.MenuItemPerMenuScalarFieldEnum[];
};
/**
 * MenuItemPerMenu without action
 */
export type MenuItemPerMenuDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemPerMenu
     */
    select?: Prisma.MenuItemPerMenuSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItemPerMenu
     */
    omit?: Prisma.MenuItemPerMenuOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemPerMenuInclude<ExtArgs> | null;
};
//# sourceMappingURL=MenuItemPerMenu.d.ts.map