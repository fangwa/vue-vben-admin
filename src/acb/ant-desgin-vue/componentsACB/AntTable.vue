<template>
  <div>
    <BasicTable
      :maxHeight="190"
      :showIndexColumn="element.props.showIndexColumn.value"
      :title="element.props.title.value"
      :titleHelpMessage="element.props.titleHelpMessage.value"
      :columns="tableColumns"
      :dataSource="dataSource"
      :pagination="{ pageSize: element.props.pageSize.value }"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { BasicTable } from '/@/components/Table';

  import { IRegisterComponent, ComponentProp } from '/@/acb/acb-component-type';

  interface AntTableColumnProps {
    dataIndex: string;
    title: string;
    key?: string;
  }

  export default defineComponent({
    components: { BasicTable },
    props: {
      element: {
        type: Object as PropType<IRegisterComponent>,
        required: true,
      },
    },
    setup(props) {
      const tableColumns = ref(
        (props.element.props.columns as ComponentProp).value as AntTableColumnProps[],
      );

      const dataSource = ref<any[]>([]);

      function generateDataSource(): void {
        dataSource.value.splice(0, dataSource.value.length);

        for (
          let rowIndex = 0;
          rowIndex < (props.element.props.pageSize as ComponentProp).value;
          rowIndex++
        ) {
          let rowData: { key: number };
          rowData = { key: rowIndex + 1 };
          for (let index = 0; index < tableColumns.value.length; index++) {
            const elementColumn = tableColumns.value[index];
            rowData[elementColumn.dataIndex] = `${elementColumn.title}_${rowIndex + 1}`;
          }
          dataSource.value.push(rowData);
        }

        // console.log(dataSource.value.length, ', generateDataSource ', dataSource.value);
      }

      generateDataSource();

      watch(
        () => (props.element.props.pageSize as ComponentProp).value,
        () => {
          // console.log('watch pageSize', newValue);
          generateDataSource();
        },
      );

      watch(
        tableColumns,
        () => {
          // console.log('watch tableColumns', newValue);
          generateDataSource();
        },
        { deep: true },
      );
      // const columns = [
      //   {
      //     title: '姓名',
      //     dataIndex: 'name',
      //     key: 'namexxx',
      //   },
      //   {
      //     title: '年龄',
      //     dataIndex: 'age',
      //   },
      //   {
      //     title: '住址',
      //     dataIndex: 'address',
      //     key: 'addressxxx',
      //   },
      // ];

      return {
        dataSource,
        tableColumns,
      };
    },
  });
</script>

<style></style>
