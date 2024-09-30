import { Colors } from "@/constants/Colors";
import { ModalType } from "@/types/enum";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState, useCallback } from "react";
import AuthModal from "@/components/AuthModal";

export default function Index() {
  const { top } = useSafeAreaInsets();
  const { showActionSheetWithOptions } = useActionSheet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["33%"], []);
  const [authType, setAuthType] = useState<ModalType | null>(null);

  const showModal = async (type: ModalType) => {
    setAuthType(type);
    bottomSheetModalRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetModal
        opacity={0.2}
        appearsOnIndex={0}
        disappersOnIndex={-1}
        {...props}
        onPress={() => bottomSheetModalRef.current?.close()}
      />
    ),
    []
  );

  const openLink = () => {
    WebBrowser.openBrowserAsync("https://www.github.com/senafrakara");
    //By using webbrowser, you dont have to quit from application. because of this,
    //we are using webBrowser
  };

  const openActionSheet = async () => {
    const options = ["View support docs", "Contact us", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: "Can't log in or sign up?",
      },
      (selectedIndex: any) => {
        console.log(selectedIndex);
      }
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { paddingTop: top + 30 }]}>
        <Image
          source={require("@/assets/images/login/trello.png")}
          style={styles.image}
        />
        <Text style={styles.introText}>
          Move teamwork forward - even on the go
        </Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#fff" }]}
            onPress={() => showModal(ModalType.Login)}
          >
            <Text style={[styles.btnText, { color: Colors.primary }]}>
              Log In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => showModal(ModalType.SignUp)}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.description}>
            By signing up, you are agree to the{"\n"}
            <Text style={styles.link} onPress={openLink}>
              User Notice{" "}
            </Text>
            and{" "}
            <Text style={styles.link} onPress={openLink}>
              Privacy Policy
            </Text>
            {"\n"}
          </Text>
          <Text style={styles.link} onPress={openActionSheet}>
            Can't log in our sign up?
          </Text>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <AuthModal authType={authType} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  image: {
    height: 450,
    paddingHorizontal: 40,
    resizeMode: "contain",
  },
  introText: {
    fontWeight: "600",
    color: "white",
    fontSize: 17,
    padding: 30,
  },
  bottomContainer: {
    gap: 10,
    width: "100%",
    padding: 40,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  btnText: {
    fontSize: 18,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    marginHorizontal: 60,
  },
  link: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
