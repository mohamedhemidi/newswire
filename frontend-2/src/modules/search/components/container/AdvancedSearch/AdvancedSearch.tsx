import { Modal } from "common/components/Modal";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import GetCategories from "modules/news/services/categories.services";
import GetSources from "modules/news/services/sources.services";
import { useEffect, useRef } from "react";
import { closeModal } from "services/UI.services";

const AdvancedSearch = () => {
  const dispatch = useAppDispatch();
  const { modal_opened } = useAppSelector((state) => state.UI);
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current && modal_opened) {
      shouldRun.current = false;
      dispatch(GetCategories());
      dispatch(GetSources());
    }
  }, [dispatch, modal_opened]);
  return (
    <Modal
      open={modal_opened}
      onClose={() => dispatch(closeModal())}
      onSubmit={() => console.log("subitted")}
    >
      <h1>Modal Opened</h1>
    </Modal>
  );
};

export default AdvancedSearch;
