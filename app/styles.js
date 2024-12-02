import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // 공통 컨테이너 스타일
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0, // 또는 0으로 줄이기
    backgroundColor: '#EBF3FF',
  },

  // styles.js에 추가
  headerContainer: {
    paddingTop: 44,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // 상단바 배경색
    borderBottomWidth: 1,
    borderColor: '#ddddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold', 
    color: '#428CF7', // 기본 강조색
  },
  topBar: {
    backgroundColor: '#FFFFFF', // Top bar color
    padding: 15,
    alignItems: 'center',
  },
  topBarTitle: {
    color: '#428CF7', // White text for the title
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 38,    
  },
  // Add this to your styles.js
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    elevation: 5,
    zIndex: 10, // zIndex 추가: 다른 요소 위에 표시되도록 설정
  },
  
  navButton: {
    padding: 15,
    alignItems: 'center',
  },
  
  navButtonText: {
    color: '#428CF7', // Color for the nav button text
    fontSize: 18,
  },

  bottomNavText: {
    fontSize: 16,
    color: '#428CF7', // Color for navigation items
  },

  // 홈 화면 스타일
  header: {
    backgroundColor: '#EBF3FF', // 밝은 톤 강조색
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#000000', // 검정색 텍스트
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#428CF7', // 검정색 텍스트
    marginBottom: 20,
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ffffff', // 기본 강조색
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    color: '#428CF7', // 흰색 텍스트
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000', // 검정색 텍스트
  },
  pharmacyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    //marginTop:10,
    paddingTop: 20,
    paddingLeft: '5%',
    color: '#000000', // 검정색 텍스트
  },
  list: {
    paddingBottom: 20,
  },

  // 홈 화면의 약물 카드 스타일
  card: {
    backgroundColor: '#FFFFFF', // 흰색 카드 배경
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
  },
  medPeriodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  medPeriod: {
    fontSize: 16,
    color: '#428CF7', // 기본 강조색
    fontWeight: 'bold',
  },
  medTime: {
    fontSize: 14,
    color: '#878787', // 중간 톤 텍스트
  },
  medContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#878787', // 중간 톤 아이콘 배경색
    marginRight: 15,
  },
  medInfo: {
    justifyContent: 'flex-start',
  },
  medName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // 검정색 텍스트
  },
  medDescription: {
    fontSize: 12,
    color: '#878787', // 중간 톤 텍스트
  },
  takenStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    width: 90,
    textAlign: 'center',
  },
  homeTaken: {
    color: '#428CF7', // 기본 강조색
    borderColor: '#428CF7', // 기본 강조색
  },
  homeNotTaken: {
    color: '#878787', // 중간 톤 색상
    borderColor: '#878787', // 중간 톤 색상
  },

  // 캘린더 화면 스타일
  calendarContainer: {
    backgroundColor: '#428CF7', // 밝은 톤 배경색
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#ffffff', // 기본 강조색
  },
  month: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // 기본 강조색
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  calendarDayLabel: {
    fontSize: 14,
    color: '#EBF3FF', // 요일 레이블 텍스트
    width: 40,
    textAlign: 'center',
  },
    // 캘린더 날짜 정렬 관련 스타일 추가
  calendarDay: {
    fontSize: 14,
    color: '#EBF3FF',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,  // 텍스트가 박스 안에서 세로로 중앙 정렬되도록
    marginBottom: 5,
    marginHorizontal: 2,
  },
  // 빈칸 스타일
  blankDay: {
    width: 40,
    height: 40,
    marginBottom: 5,
    marginHorizontal: 2,  // 빈칸도 날짜와 동일한 간격으로 유지
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dateSelected: {
    fontSize: 16,
    color: '#428CF7', // 흰색 텍스트 (선택된 상태)
    backgroundColor: '#ffffff', // 선택된 상태의 배경색
    borderRadius: 10, // 선택된 상태의 둥근 테두리
    width: 40, // 선택된 날짜 박스의 너비
    height: 40, // 선택된 날짜 박스의 높이
    textAlign: 'center', // 텍스트 중앙 정렬
    lineHeight: 40, // 세로로 중앙 정렬
    marginBottom: 5,
  },
  dateUnselected: {
    fontSize: 16,
    color: '#333', // 일반 날짜 텍스트 색상
    backgroundColor: '#F5F5F5', // 일반 날짜 배경색
    borderRadius: 20, // 둥근 모서리
    width: 40, // 날짜 박스의 너비 (선택되지 않은 상태)
    height: 40, // 날짜 박스의 높이 (선택되지 않은 상태)
    textAlign: 'center', // 텍스트 중앙 정렬
    lineHeight: 40, // 세로로 중앙 정렬
    marginBottom: 5,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#428CF7', // 기본 강조색
  },
  medList: {
    paddingBottom: 20,
  },
  medCard: {
    backgroundColor: '#FFFFFF', // 흰색 카드 배경
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarTaken: {
    color: '#428CF7', // 기본 강조색
    fontWeight: 'bold',
  },
  calendarNotTaken: {
    color: '#878787', // 중간 톤 색상
    fontWeight: 'bold',
  },

  // SearchScreen 스타일
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Search 배경
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  searchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pharmacyButton: {
    backgroundColor: '#4da6ff', // 약국 검색 버튼 색상
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '30%', // 버튼의 너비 조정
  },
  pharmacyButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  cameraIcon: {
    marginVertical: 10,
    color: '#428CF7', // 기본 강조색
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    marginTop: 20,
  },
  medicineListContainer: {
    paddingBottom: 20,
    paddingTop: 20,
    // flexDirection과 flexWrap 삭제
  },
  medicineList: {
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 10,
  },
  medicineChoiceList: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5', // 선택지 배경색
  },
  medicineChoiceItem: {
    padding: 15,
    borderBottomColor: '#428CF7',
    borderBottomWidth: 1,
    width: '80%',  // 텍스트 컨테이너가 모달의 80%를 차지
    alignSelf: 'center',  // 중앙에 맞춤
    textAlign: 'center',
    color: '#428CF7',
    fontWeight: 'bold',
    flexWrap: 'wrap',  // 텍스트가 모달의 너비를 넘어가면 줄바꿈되도록 설정
  },
  selectedMedication: {
    backgroundColor: '#428CF7', // Highlight the selected medication
    color: '#FFFFFF', // White text for the selected medication
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 5,
  },
  medicineChoiceButton: {
    backgroundColor: '#428CF7', // 버튼 배경색
    padding: 12,  // 버튼 내부 패딩
    borderRadius: 8, // 둥근 테두리
    marginVertical: 5,  // 버튼 사이 간격
    width: '80%',  // 버튼 너비
    alignSelf: 'center', // 중앙 정렬
  },
  medicineChoiceButtonText: {
    color: '#FFFFFF',  // 버튼 텍스트 색상 (흰색)
    fontSize: 14,  // 텍스트 크기
    //fontWeight: 'bold',  // 굵은 텍스트
    textAlign: 'center',  // 텍스트 중앙 정렬
  },
  // styles.js에 새로운 스타일 추가
  medicineImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode: 'cover',
  },
  // 약물 정보 섹션 스타일 수정
  // 아이콘과 텍스트를 포함하는 컨테이너
  medicineInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 10,  // 아이콘과 텍스트 사이 간격 추가
  },

  // 약물 이름 스타일
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#428CF7',
    marginBottom: 5,
  },

  // 약물 설명 스타일
  medicineDescription: {
    fontSize: 12,
    color: '#878787',
  },
  // 약물 카드 스타일
  medicineCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',  // 한 줄에 하나의 카드가 보이도록 설정
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EBF3FF',
    borderWidth: 1,
    height: 100,  // 카드 높이 조정
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#4da6ff',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 0, // 여분의 공간 제거
  },
  addButtonText: {
    color: '#ffffff', // White text
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  savedIcon: {
    color: '#428CF7', // 기본 강조색
  },
  unsavedIcon: {
    color: '#878787', // 중간 톤 색상
  },
  moreOptionsMenu: {
    backgroundColor: '#428CF7',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    //borderWidth: 1,
  },
  moreOptionsButton: {
    backgroundColor: '#FFFFFF', // White background for buttons
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10, // Added margin between the buttons
    width: '100%', // Full width button for better touch targets
  },
  cancelButton: {
    backgroundColor: '#FFFFFF', // White background for Cancel
    borderColor: '#878787', // Grey border for Cancel
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10, // Space between Cancel and Delete
    width: '100%', // Full width for better touch targets
  },
  deleteButton: {
    backgroundColor: '428CF7',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius:20,
  },
  deleteButtonText: {
    color: '000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  moreOptionsText: {
    fontSize: 14,
    color: '#ffffff', // 기본 강조색
  },
  cancelText: {
    color: '#878787', // Grey text for Cancel button
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#000000', // White text for Delete button
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'center',

  },
  // 프로필 화면 스타일
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 30,
  },
  profileImage: {
    width: '60%',
    height: '60%',
    borderRadius: 50,
    //backgroundColor: '#878787', // 중간 톤 색상
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000', // 검정색 텍스트
  },
  profileAge: {
    fontSize: 16,
    color: '#878787', // 중간 톤 텍스트
  },
  button: {
    backgroundColor: '#ffffff', // 버튼 배경
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#428CF7', // 기본 강조색
  },
  icon: {
    marginRight: 10,
    color: '#878787', // 중간 톤 아이콘 색상
  },

  // Modal 스타일
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 투명 배경
  },
  modalContent: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    maxHeight: '80%',  // 최대 높이를 80%로 설정
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,  // Android용 그림자 효과
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#878787', // 중간 톤 아이콘 색상
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000000', // 검정색 텍스트
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#878787',  // 기본 강조색
    marginBottom: 10,
    textAlign: 'left',
    fontWeight: 'bold',
    width: '100%',
  },
  subTitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollableModalContent: {
    maxHeight: 300, // Limit the height to make it scrollable
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  selectedTimeContainer: {
    marginTop: 10,
  },
  // 선택되지 않은 시간 버튼 스타일
  timeOption: {
    backgroundColor: '#F5F5F5', // 선택되지 않은 버튼 배경색
    color: '#000000', // 선택되지 않은 버튼 텍스트 색상
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center', // 버튼 중앙 정렬
  },
  // 선택된 시간 버튼 스타일 (HomeScreen 및 ProfileScreen)
  selectedTime: {
    backgroundColor: '#428CF7', // 선택된 버튼 배경색
    color: '#FFFFFF', // 선택된 버튼 텍스트 색상
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center', // 버튼 중앙 정렬
  },
  // 모달 버튼 스타일
  modalButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  modalButton: {
    backgroundColor: '#428CF7', // 버튼 배경
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: '90%', // 버튼 너비를 반응형으로 조정
    alignItems: 'center',
  },
  modalButtonText: {
      color: '#FFFFFF', // Button text color
      fontWeight: 'bold',
      fontSize: 16,
  },
  modalItemText: {
    fontSize: 16,
    padding: 10,
    color: '#000000', // Black text
    textAlign: 'center',
  },
  // 모달 내에서 약물 수동 추가를 위한 입력 필드 스타일
  modalInput: {
    borderWidth: 1,
    borderColor: '#878787',
    borderRadius: 8, // 부드러운 테두리
    padding: 12,  // 충분한 패딩 추가
    marginBottom: 15,
    width: '100%',
  },
  // 모달 내에서 알약 색상 선택을 위한 팔레트 스타일
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  // 모양 선택을 위한 컨테이너
  shapeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },


  // EditProfileModal 스타일
  inputContainer: {
    marginBottom: 15,
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#878787', // 중간 톤 텍스트
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EBF3FF', // 밝은 톤 배경색
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  starIcon: {
    color: '#428CF7', // Gold color for favorited items
    marginRight: 2, // Space between the icon and other elements
  },
  unstarIcon: {
    color: '#878787', // Grey color for unfavorited items
    marginRight: 2, 
  },
  topRightIcon: {
  position: 'absolute',
  top: 80, // Adjust as needed
  right: 30, // Adjust as needed
  zIndex: 1000, // Ensure it appears on top
  },


  // SettingsModal 스타일
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#EBF3FF', // 밝은 톤 배경색
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  settingsItemText: {
    fontSize: 16,
    color: '#428CF7', // 기본 강조색
  },
  saveButton: {
    backgroundColor: '#428CF7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
    // Add this container style for the Camera and File buttons
  cameraFileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },

  dateWithStrike: {
    fontSize: 16,
    color: '#333', // 날짜 텍스트 색상
    textDecorationLine: 'line-through', // 날짜에 중간 선을 추가
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 5,
  },
  noMedicationText: {
    fontSize: 16,
    color: '#878787',
    textAlign: 'center',
    marginVertical: 20,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#EBF3FF',
    alignItems: 'center', // 카드가 화면 중앙으로 정렬되도록
    padding: 20,
  },
  mapHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#428CF7', // 강조 텍스트 색상
    textAlign: 'center',
    marginBottom: 20,
  },
  map: {
    width: '90%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    marginLeft: '5%',
    marginRight: '5%',
  },
  // 약국 리스트 컨테이너
  pharmacyList: {
    width: '100%', // 화면 가로 기준 80%로 설정
    marginTop: 20,
  },
  // 약국 카드
  pharmacyCard: {
    backgroundColor: '#FFFFFF', // 흰색 배경
    padding: 15, // 내부 여백
    borderRadius: 10, // 둥근 모서리
    marginBottom: 15, // 카드 간격
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.1, // 그림자 투명도
    shadowRadius: 5, // 그림자 반경
    elevation: 2, // 그림자 높이 (Android용)
    borderWidth: 1, // 테두리 두께
    borderColor: '#EBF3FF', // 테두리 색상
    marginLeft: '5%', // 왼쪽 여백
    marginRight: '5%', // 오른쪽 여백
  },

  // 약국 이름 스타일
  pharmacyName: {
    fontSize: 16, // 글꼴 크기
    fontWeight: 'bold', // 굵은 글꼴
    color: '#428CF7', // 기본 강조 색상
    marginBottom: 5, // 이름과 주소 사이 간격
  },

  // 약국 주소 스타일
  pharmacyAddress: {
    fontSize: 14, // 글꼴 크기
    color: '#878787', // 중간 톤 색상
    marginBottom: 5, // 주소와 거리 사이 간격
  },

  // 약국 거리 스타일
  pharmacyDistance: {
    fontSize: 14, // 글꼴 크기
    fontWeight: 'bold', // 굵은 글꼴
    color: '#4da6ff', // 거리 강조 색상
  },

  // 로딩 인디케이터 스타일
  loadingIndicator: {
    marginVertical: 20, // 위아래 간격
  },

  // 에러 텍스트 스타일
  errorText: {
    color: '#FF6B6B', // 빨간색 계열
    fontSize: 14, // 글꼴 크기
    textAlign: 'center', // 가운데 정렬
    marginVertical: 10, // 위아래 간격
  },
  pharmacyHours: {
    fontSize: 14,
    color: '#878787', // 기본 텍스트 색상
    borderTopWidth: 1, // 선의 두께
    borderTopColor: '#DDDDDD', // 선의 색상 (밝은 회색)
    paddingTop: 5, // 선과 텍스트 사이 간격
    marginTop: 10, // 상단 간격 추가
  },
  
  // Health News 관련 스타일 추가
  healthNewsModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 투명하게 처리
  },
  healthNewsModalContent: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 15,
    width: '85%',
    maxHeight: 400, // 최대 높이 설정 (스크롤 가능)
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,  // Android용 그림자 효과
  },
healthNewsTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 15,
  color: '#428CF7', // 건강 뉴스 제목 색상
},
newsItem: {
  backgroundColor: '#FFFFFF', // 뉴스 항목 배경
  padding: 10,
  marginBottom: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#EBF3FF', // 뉴스 항목 테두리 색상
  width: '100%',
},
buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
},
newsContainer: {
  backgroundColor: '#FFFFFF',
  padding: 15,
  marginBottom: 15,
  borderRadius: 10,
},
newsTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000000', // 뉴스 제목 텍스트 색상
  marginBottom: 5,
},
newsDescription: {
  fontSize: 14,
  color: '#878787', // 뉴스 설명 텍스트 색상
},
closeButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  color: '#428CF7', // 닫기 버튼 색상
  fontSize: 24,
},


// List for Health News
newsList: {
  marginTop: 15,
  width: '100%',
},
newsItemContainer: {
  padding: 10,
  borderBottomWidth: 1,
  borderColor: '#EBF3FF', // 뉴스 항목 구분선
  marginBottom: 10,
},
newsItemText: {
  fontSize: 14,
  color: '#428CF7',
  fontWeight: 'bold',
},
settingsIcon: {
  position: 'absolute',
  top: 10,
  right: 20,
  zIndex: 10,
},

});

export default styles;