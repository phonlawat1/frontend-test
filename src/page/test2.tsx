import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Layout, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editFormData, saveFormData } from "../slice/formSlice";
import Table from "../componenets/table";
import "../styles/test2.scss";

function test2() {
  const { t, i18n } = useTranslation(["home"]);
  const [lang, setLang] = useState("th");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formM] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSelect, setDataSelect] = useState();
  const dataform = useSelector((state: any) => state.test.dataList);

  const dispatch = useDispatch();
  const { Header, Footer, Content } = Layout;

  const headerStyle: React.CSSProperties = {
    textAlign: "end",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
  };

  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(100%)",
    maxWidth: "calc(100%)",
  };

  const onClickLanguageChange = (e: any) => {
    const language = e;
    setLang(e);
    i18n.changeLanguage(language);
  };

  const backTest = () => {
    navigate(-1);
  };

  const onFinish = (values: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    const lastData = dataform[dataform.length - 1];
    const newIndex = lastData ? lastData.id + 1 : 1;
    const newData = { ...values, id: newIndex };

    dispatch(saveFormData(newData));
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    setDataSelect(record);
    setIsModalVisible(true);
    formM.setFieldsValue(record);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRecord = () => {
    let dataSearchId: any = dataSelect;
    formM?.validateFields().then((values) => {
      let dataEdit = values;
      const dataAddEdit = { ...dataEdit, id: dataSearchId.id };

      dispatch(editFormData(dataAddEdit));
      setIsModalVisible(false);
    });
  };

  return (
    <div className="containerform">
      <Modal
        className="Modal"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            {t("Cancel")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleRecord}>
            {t("Record")}
          </Button>,
        ]}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: 800,
            color: "black",
          }}
        >
          {t("EditPersonalInformation")}
        </p>
        <Form
          name="editPersonal-info"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 15 }}
          form={formM}
          onFinish={handleRecord}
          autoComplete="off"
          initialValues={dataSelect}
        >
          <Form.Item
            className="ant-form-item-required"
            label={t("Firstname")}
            name="firstName"
            rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="ant-form-item-required"
            label={t("Lastname")}
            name="lastName"
            rules={[{ required: true, message: "กรุณากรอกสกุล" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Email")}
            name="email"
            rules={[
              { required: true, message: "กรุณากรอกอีเมล" },
              { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Phone")}
            name="phone"
            rules={[
              { required: true, max: 10, message: "กรุณากรอกเบอร์โทรศัพท์" },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>
        </Form>
      </Modal>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div className="selectLang">
            {lang === "en" ? (
              <Button
                className="btnLang"
                onClick={() => onClickLanguageChange("th")}
              >
                Thai
              </Button>
            ) : (
              <Button
                className="btnLang"
                onClick={() => onClickLanguageChange("en")}
              >
                English
              </Button>
            )}
            <Button onClick={backTest}>{t("Back")}</Button>
          </div>
        </Header>
        <Content style={contentStyle}>
          <p className="titleform">{t("PersonalInformation")}</p>
          <Form
            className="form"
            name="personal-info"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 10 }}
            form={form}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              className="ant-form-item-required"
              label={t("Firstname")}
              name="firstName"
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="ant-form-item-required"
              label={t("Lastname")}
              name="lastName"
              rules={[{ required: true, message: "กรุณากรอกสกุล" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("Email")}
              name="email"
              rules={[
                { required: true, message: "กรุณากรอกอีเมล" },
                { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("Phone")}
              name="phone"
              rules={[
                {
                  required: true,
                  max: 10,
                  message: "กรุณากรอกเบอร์โทรศัพท์",
                },
              ]}
            >
              <Input type="number" maxLength={10} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">
                {t("Record")}
              </Button>
            </Form.Item>
          </Form>
        </Content>
        <Footer style={footerStyle}>
          <Table dataform={dataform} handleEdit={handleEdit} />
        </Footer>
      </Layout>
    </div>
  );
}

export default test2;
