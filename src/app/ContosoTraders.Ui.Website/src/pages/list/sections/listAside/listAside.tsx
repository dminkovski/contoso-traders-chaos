import SidebarAccordion from "app/components/accordion/sidebarAccordion";

interface ListAsideProps {
    onFilterChecked: Array<string>;
    brandsList: Array<string>;
    typesList: Array<string>;
}

const ListAside = ({onFilterChecked, brandsList}:ListAsideProps) => {
    return (
        <aside className="list__aside">
            <SidebarAccordion
                onFilterChecked={onFilterChecked}
                data={brandsList}
                title="Brands"
                id="brand"
            />
        </aside>
    );
}

export default ListAside;
